package com.quoteflow.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quoteflow.backend.dto.AiAnalysisResult;
import com.quoteflow.backend.dto.AiQuotationRequest;
import com.quoteflow.backend.dto.QuotationDto;
import com.quoteflow.backend.dto.QuotationItemDto;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Customer;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiService {

    private final AiServiceFactory aiServiceFactory;
    private final ObjectMapper objectMapper;
    private final QuotationService quotationService;
    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;

    public AiAnalysisResult analyzeRequirements(AiQuotationRequest request) {
        if (aiServiceFactory.isAiEnabled()) {
            return analyzeWithAi(request);
        }
        return analyzeWithRules(request);
    }

    public QuotationDto generateAndSaveQuotation(AiQuotationRequest request,
                                                  com.quoteflow.backend.entity.User user) {
        AiAnalysisResult analysis = analyzeRequirements(request);

        QuotationDto dto = new QuotationDto();
        dto.setCompanyId(user.getCompany().getId());
        dto.setCustomerId(resolveCustomerId(user, request));
        dto.setCreatedById(user.getId());
        dto.setAiGenerated(true);
        dto.setAiConfidence(analysis.getConfidence() != null
                ? analysis.getConfidence() : BigDecimal.valueOf(85));
        dto.setVoiceGenerated(false);
        dto.setCurrency("INR");
        dto.setStatus(com.quoteflow.backend.entity.QuotationStatus.DRAFT);
        dto.setNotes(request.getDescription());

        BigDecimal subtotal = BigDecimal.ZERO;
        List<QuotationItemDto> itemDtos = new ArrayList<>();
        int order = 0;
        for (AiAnalysisResult.CostBreakdown.CostItem ci : analysis.getCostBreakdown().getItems()) {
            if (!"oneTime".equals(ci.getType())) continue;

            QuotationItemDto itemDto = new QuotationItemDto();
            itemDto.setItemName(ci.getName());
            itemDto.setDescription(ci.getCategory() + " - " + ci.getName());
            itemDto.setQuantity(BigDecimal.ONE);
            itemDto.setUnitPrice(ci.getAmount());
            itemDto.setDiscount(BigDecimal.ZERO);
            itemDto.setTaxRate(new BigDecimal("18"));
            itemDto.setTotal(ci.getAmount());
            itemDto.setCostPrice(ci.getAmount());
            itemDto.setAiSuggested(true);
            itemDto.setSortOrder(order++);
            itemDtos.add(itemDto);
            subtotal = subtotal.add(ci.getAmount());
        }

        if (analysis.getItems() != null) {
            for (QuotationItemDto aiItem : analysis.getItems()) {
                itemDtos.add(aiItem);
                subtotal = subtotal.add(aiItem.getTotal() != null ? aiItem.getTotal() : BigDecimal.ZERO);
            }
        }

        dto.setItems(itemDtos);
        dto.setSubtotal(subtotal);

        BigDecimal taxAmount = subtotal.multiply(new BigDecimal("0.18"))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal totalAmount = subtotal.add(taxAmount);

        dto.setDiscountType("PERCENTAGE");
        dto.setDiscountValue(BigDecimal.ZERO);
        dto.setTaxType("GST");
        dto.setTaxAmount(taxAmount);
        dto.setTotalAmount(totalAmount);

        if (analysis.getTermsConditions() != null) {
            dto.setTermsConditions(String.join("\n", analysis.getTermsConditions()));
        }

        return quotationService.createQuotation(dto, user);
    }

    private UUID resolveCustomerId(com.quoteflow.backend.entity.User user, AiQuotationRequest request) {
        UUID companyId = user.getCompany().getId();
        if (request.getCustomerEmail() != null && !request.getCustomerEmail().isBlank()) {
            List<Customer> existing = customerRepository.findByCompanyId(companyId);
            for (Customer c : existing) {
                if (request.getCustomerEmail().equalsIgnoreCase(c.getEmail())) {
                    return c.getId();
                }
            }
        }
        if (request.getCustomerPhone() != null && !request.getCustomerPhone().isBlank()) {
            List<Customer> existing = customerRepository.findByCompanyId(companyId);
            for (Customer c : existing) {
                if (request.getCustomerPhone().equals(c.getPhone())) {
                    return c.getId();
                }
            }
        }
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Customer walkIn = Customer.builder()
                .company(company)
                .name(request.getCustomerName() != null ? request.getCustomerName() : "AI Generated Customer")
                .email(request.getCustomerEmail())
                .phone(request.getCustomerPhone())
                .companyName(request.getCustomerCompany())
                .build();
        return customerRepository.save(walkIn).getId();
    }

    private AiAnalysisResult analyzeWithAi(AiQuotationRequest request) {
        String systemPrompt = buildSystemPrompt();
        String userMessage = buildUserMessage(request);
        AiProvider provider = aiServiceFactory.getProvider();

        String response = provider.analyze(systemPrompt, userMessage);
        return parseAiResponse(response, request);
    }

    public AiAnalysisResult analyzeWithRules(AiQuotationRequest request) {
        Map<String, Object> ruleResult = aiServiceFactory.getEstimationService()
                .analyzeRequirement(request.getDescription());

        AiAnalysisResult result = new AiAnalysisResult();
        result.setProjectType((String) ruleResult.get("projectType"));
        result.setDetectedModules((List<String>) ruleResult.getOrDefault("detectedModules", new ArrayList<>()));
        result.setDetectedFeatures((List<String>) ruleResult.getOrDefault("detectedFeatures", new ArrayList<>()));
        result.setConfidence(BigDecimal.valueOf(60));

        Map<String, Object> infra = (Map<String, Object>) ruleResult.getOrDefault("infrastructure", new HashMap<>());
        AiAnalysisResult.Infrastructure infrastructure = new AiAnalysisResult.Infrastructure();
        infrastructure.setDomain((boolean) infra.getOrDefault("domain", false));
        infrastructure.setHosting((boolean) infra.getOrDefault("hosting", false));
        infrastructure.setDatabase((boolean) infra.getOrDefault("database", false));
        infrastructure.setSsl((boolean) infra.getOrDefault("ssl", false));
        result.setInfrastructure(infrastructure);

        Map<String, Object> costBreakdown = (Map<String, Object>) ruleResult.getOrDefault("costBreakdown", new HashMap<>());
        AiAnalysisResult.CostBreakdown cb = new AiAnalysisResult.CostBreakdown();
        cb.setTotalCost(BigDecimal.valueOf((int) costBreakdown.getOrDefault("totalCost", 0)));
        cb.setFinalQuote(BigDecimal.valueOf((int) costBreakdown.getOrDefault("finalPrice", 0)));
        cb.setProfitMargin(BigDecimal.valueOf((int) costBreakdown.getOrDefault("profitMargin", 0)));
        result.setCostBreakdown(cb);

        Map<String, Object> timeline = (Map<String, Object>) ruleResult.getOrDefault("timeline", new HashMap<>());
        AiAnalysisResult.Timeline tl = new AiAnalysisResult.Timeline();
        tl.setTotalDays((int) timeline.getOrDefault("totalDays", 0));
        result.setTimeline(tl);

        result.setDescription(request.getDescription());
        return result;
    }

    private String buildSystemPrompt() {
        return """
            You are an expert quotation and project estimation assistant for QuoteFlow AI, a platform used by Indian SMBs.
            Your task is to analyze project requirements and generate a detailed, professional quotation.

            Analyze the user's requirements and return a VALID JSON object (no markdown, no code blocks) with this structure:
            {
              "projectType": "WEBSITE|MOBILE_APP|ERP|CRM|E_COMMERCE|BILLING_SOFTWARE|CUSTOM_SOFTWARE",
              "projectName": "Short project name",
              "summary": "1-2 sentence summary of what needs to be built",
              "detectedModules": ["Module1", "Module2"],
              "detectedFeatures": ["feature1", "feature2"],
              "infrastructure": {
                "domain": true/false,
                "domainName": "example.com or empty",
                "hosting": true/false,
                "hostingType": "SHARED|VPS|CLOUD|DEDICATED",
                "database": true/false,
                "databaseType": "MySQL|PostgreSQL|MongoDB",
                "ssl": true/false
              },
              "costBreakdown": {
                "developmentCost": <number>,
                "infrastructureCost": <number>,
                "totalCost": <number>,
                "profitMargin": <number (30% of totalCost)>,
                "finalQuote": <totalCost + profitMargin>,
                "items": [
                  { "category": "Development", "name": "UI/UX Design", "amount": <number>, "type": "oneTime" },
                  { "category": "Development", "name": "Frontend Development", "amount": <number>, "type": "oneTime" },
                  { "category": "Development", "name": "Backend Development", "amount": <number>, "type": "oneTime" },
                  { "category": "Hosting", "name": "Cloud Hosting (Annual)", "amount": <number>, "type": "annual" },
                  { "category": "Domain", "name": "Domain Registration", "amount": <number>, "type": "oneTime" }
                ]
              },
              "items": [
                { "itemName": "UI/UX Design", "description": "Complete UI/UX design", "quantity": 1, "unitPrice": <number>, "total": <number> }
              ],
              "deliverables": ["Responsive website", "Admin panel", "etc"],
              "termsConditions": ["50% advance payment", "30% on milestone", "20% on completion"],
              "technologyStack": "React, Node.js, PostgreSQL, etc",
              "timeline": { "totalDays": <number>, "phases": [{ "name": "Requirement Analysis", "days": 3 }] }
            }

            Pricing guidelines (all amounts in INR):
            - Website: base 30,000-1,00,000 depending on complexity
            - Mobile App: base 50,000-2,00,000
            - ERP: base 80,000-3,00,000
            - CRM: base 60,000-1,50,000
            - E-Commerce: base 60,000-2,00,000
            - Add 15-30% profit margin on total
            - Domain: ₹999-1,200, Hosting: ₹3,000-25,000/yr, SSL: ₹0-4,000
            - For school/education projects include: Student Management, Fee Management, Attendance, Exam Management, etc.
            - For ERP include: Dashboard, User Management, Reports, Analytics, Inventory, HR, Accounts as needed

            CRITICAL: Return ONLY valid JSON. No explanations, no markdown formatting, no code fences.
            """;
    }

    private String buildUserMessage(AiQuotationRequest request) {
        StringBuilder sb = new StringBuilder();
        sb.append("Generate a detailed quotation for the following project requirement:\n\n");
        sb.append("Requirements: ").append(request.getDescription()).append("\n");
        if (request.getCustomerName() != null && !request.getCustomerName().isEmpty()) {
            sb.append("Customer Name: ").append(request.getCustomerName()).append("\n");
        }
        if (request.getCustomerCompany() != null && !request.getCustomerCompany().isEmpty()) {
            sb.append("Company: ").append(request.getCustomerCompany()).append("\n");
        }
        if (request.getCustomerEmail() != null && !request.getCustomerEmail().isEmpty()) {
            sb.append("Email: ").append(request.getCustomerEmail()).append("\n");
        }
        return sb.toString();
    }

    private AiAnalysisResult parseAiResponse(String response, AiQuotationRequest request) {
        String cleaned = response.trim();
        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }
        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length() - 3);
        }
        cleaned = cleaned.trim();

        try {
            AiAnalysisResult result = objectMapper.readValue(cleaned, AiAnalysisResult.class);
            if (result.getConfidence() == null) {
                result.setConfidence(BigDecimal.valueOf(90));
            }
            if (result.getDescription() == null) {
                result.setDescription(request.getDescription());
            }
            return result;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse AI response as JSON. Response: " + cleaned, e);
        }
    }
}
