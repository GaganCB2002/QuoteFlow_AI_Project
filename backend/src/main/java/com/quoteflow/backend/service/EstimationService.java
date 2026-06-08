package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.CostTemplate;
import com.quoteflow.backend.entity.CostTemplateItem;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CostTemplateItemRepository;
import com.quoteflow.backend.repository.CostTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EstimationService {

    private final CostTemplateRepository costTemplateRepository;
    private final CostTemplateItemRepository costTemplateItemRepository;
    private final CompanyRepository companyRepository;

    // Project type multipliers for development effort
    private static final Map<String, Map<String, Object>> PROJECT_PARAMS = new LinkedHashMap<>();
    static {
        PROJECT_PARAMS.put("WEBSITE", Map.of(
            "baseCost", 30000, "pageCost", 2000, "hoursPerPage", 4,
            "questions", List.of("pages", "adminPanel", "blog", "contactForm", "paymentGateway", "seo", "multiLanguage", "hosting", "domain")
        ));
        PROJECT_PARAMS.put("MOBILE_APP", Map.of(
            "baseCost", 50000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("android", "ios", "adminPanel", "pushNotifications", "paymentGateway", "maps", "chat", "videoUpload")
        ));
        PROJECT_PARAMS.put("ERP", Map.of(
            "baseCost", 80000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("modules", "users", "adminPanel", "reports", "multiBranch", "inventory", "hr", "accounts")
        ));
        PROJECT_PARAMS.put("CRM", Map.of(
            "baseCost", 60000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("users", "adminPanel", "emailIntegration", "reports", "leadManagement", "pipeline", "analytics")
        ));
        PROJECT_PARAMS.put("BILLING_SOFTWARE", Map.of(
            "baseCost", 50000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("gstSupport", "users", "inventory", "reports", "paymentGateway", "multiBranch")
        ));
        PROJECT_PARAMS.put("E_COMMERCE", Map.of(
            "baseCost", 60000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("products", "paymentGateway", "adminPanel", "shipping", "reviews", "multiVendor", "seo")
        ));
        PROJECT_PARAMS.put("DIGITAL_MARKETING", Map.of(
            "baseCost", 15000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("seo", "socialMedia", "emailMarketing", "ppc", "contentWriting", "analytics")
        ));
        PROJECT_PARAMS.put("SEO", Map.of(
            "baseCost", 10000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("onPage", "offPage", "technical", "content", "analytics", "competitorAnalysis")
        ));
        PROJECT_PARAMS.put("GRAPHIC_DESIGN", Map.of(
            "baseCost", 8000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("logo", "brochure", "socialMediaPosts", "banner", "branding", "uiDesign")
        ));
        PROJECT_PARAMS.put("CUSTOM_SOFTWARE", Map.of(
            "baseCost", 100000, "pageCost", 0, "hoursPerPage", 0,
            "questions", List.of("modules", "users", "adminPanel", "reports", "integration", "api", "database")
        ));
    }

    // Cost definitions
    private static final Map<String, Map<String, Object>> DOMAIN_COSTS = Map.of(
        ".com", Map.of("registration", 999, "renewal", 1099),
        ".in", Map.of("registration", 499, "renewal", 599),
        ".org", Map.of("registration", 799, "renewal", 899),
        ".net", Map.of("registration", 899, "renewal", 999)
    );

    private static final Map<String, Integer> HOSTING_COSTS = Map.of(
        "SHARED", 3000, "VPS", 12000, "CLOUD", 25000, "DEDICATED", 50000
    );

    private static final Map<String, Integer> AUTH_COSTS = Map.of(
        "EMAIL", 3000, "MOBILE_OTP", 5000, "GOOGLE", 4000, "FACEBOOK", 4000, "BIOMETRIC", 8000
    );

    private static final Map<String, Integer> FEATURE_COSTS = new LinkedHashMap<>();
    static {
        FEATURE_COSTS.put("adminPanel", 15000);
        FEATURE_COSTS.put("blog", 5000);
        FEATURE_COSTS.put("contactForm", 3000);
        FEATURE_COSTS.put("paymentGateway", 10000);
        FEATURE_COSTS.put("seo", 5000);
        FEATURE_COSTS.put("multiLanguage", 8000);
        FEATURE_COSTS.put("pushNotifications", 6000);
        FEATURE_COSTS.put("maps", 8000);
        FEATURE_COSTS.put("chat", 10000);
        FEATURE_COSTS.put("videoUpload", 8000);
        FEATURE_COSTS.put("inventory", 12000);
        FEATURE_COSTS.put("reports", 8000);
        FEATURE_COSTS.put("multiBranch", 15000);
        FEATURE_COSTS.put("emailIntegration", 5000);
        FEATURE_COSTS.put("leadManagement", 5000);
        FEATURE_COSTS.put("pipeline", 5000);
        FEATURE_COSTS.put("analytics", 8000);
        FEATURE_COSTS.put("gstSupport", 5000);
        FEATURE_COSTS.put("reviews", 5000);
        FEATURE_COSTS.put("multiVendor", 20000);
        FEATURE_COSTS.put("shipping", 8000);
        FEATURE_COSTS.put("socialMedia", 5000);
        FEATURE_COSTS.put("emailMarketing", 5000);
        FEATURE_COSTS.put("ppc", 3000);
        FEATURE_COSTS.put("contentWriting", 5000);
        FEATURE_COSTS.put("onPage", 5000);
        FEATURE_COSTS.put("offPage", 8000);
        FEATURE_COSTS.put("technical", 5000);
        FEATURE_COSTS.put("competitorAnalysis", 3000);
        FEATURE_COSTS.put("logo", 5000);
        FEATURE_COSTS.put("brochure", 3000);
        FEATURE_COSTS.put("socialMediaPosts", 2000);
        FEATURE_COSTS.put("banner", 2000);
        FEATURE_COSTS.put("branding", 10000);
        FEATURE_COSTS.put("uiDesign", 5000);
        FEATURE_COSTS.put("integration", 15000);
        FEATURE_COSTS.put("api", 10000);
        FEATURE_COSTS.put("database", 5000);
        FEATURE_COSTS.put("hr", 15000);
        FEATURE_COSTS.put("accounts", 15000);
    }

    public List<CostTemplate> getAllTemplates(UUID companyId) {
        return costTemplateRepository.findByCompanyId(companyId);
    }

    public List<CostTemplateItem> getTemplateItems(UUID templateId) {
        CostTemplate template = costTemplateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Cost template not found"));
        return costTemplateItemRepository.findByTemplateId(template.getId());
    }

    @Transactional
    public CostTemplate createTemplate(UUID companyId, String name, String description, List<Map<String, Object>> items) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        CostTemplate template = CostTemplate.builder()
                .company(company)
                .name(name)
                .description(description)
                .isActive(true)
                .build();
        CostTemplate savedTemplate = costTemplateRepository.save(template);
        if (items != null) {
            for (Map<String, Object> itemMap : items) {
                CostTemplateItem item = CostTemplateItem.builder()
                        .template(savedTemplate)
                        .category((String) itemMap.get("category"))
                        .name((String) itemMap.get("name"))
                        .description((String) itemMap.get("description"))
                        .costPrice(new BigDecimal(itemMap.getOrDefault("costPrice", "0").toString()))
                        .sellingPrice(new BigDecimal(itemMap.getOrDefault("sellingPrice", "0").toString()))
                        .isOptional(itemMap.containsKey("isOptional") && (Boolean) itemMap.get("isOptional"))
                        .sortOrder(itemMap.containsKey("sortOrder") ? (Integer) itemMap.get("sortOrder") : 0)
                        .build();
                costTemplateItemRepository.save(item);
                savedTemplate.getItems().add(item);
            }
        }
        return savedTemplate;
    }

    public Map<String, Object> getProjectParams(String projectType) {
        Map<String, Object> params = PROJECT_PARAMS.get(projectType != null ? projectType.toUpperCase() : "WEBSITE");
        if (params == null) params = PROJECT_PARAMS.get("CUSTOM_SOFTWARE");
        Map<String, Object> result = new LinkedHashMap<>(params);
        result.put("projectType", projectType);
        result.put("availableTypes", PROJECT_PARAMS.keySet().stream()
            .map(k -> k.replace("_", " ").toLowerCase())
            .map(s -> { String[] parts = s.split(" "); StringBuilder sb = new StringBuilder(); for (String p : parts) { sb.append(Character.toUpperCase(p.charAt(0))).append(p.substring(1)).append(" "); } return sb.toString().trim(); })
            .toList());
        return result;
    }

    public Map<String, Object> analyzeRequirement(String text) {
        Map<String, Object> result = new LinkedHashMap<>();
        String lower = text.toLowerCase();
        List<String> detectedFeatures = new ArrayList<>();
        List<String> detectedModules = new ArrayList<>();

        // Detect project type from text
        String projectType = "CUSTOM_SOFTWARE";
        if (lower.contains("website") || lower.contains("web site") || lower.contains("school") && (lower.contains("management") || lower.contains("portal"))) {
            projectType = "WEBSITE";
            if (lower.contains("school") || lower.contains("college") || lower.contains("education")) {
                detectedModules.addAll(List.of("Student Management", "Teacher Management", "Class Management", "Attendance"));
                if (lower.contains("fee") || lower.contains("payment") || lower.contains("online payment")) {
                    detectedModules.add("Fee Management");
                    detectedModules.add("Payment Gateway");
                }
                if (lower.contains("exam") || lower.contains("result") || lower.contains("grade")) {
                    detectedModules.add("Exam Management");
                    detectedModules.add("Result Management");
                }
                detectedFeatures.addAll(List.of("adminPanel", "paymentGateway", "database"));
            }
            if (lower.contains("ecommerce") || lower.contains("e-commerce") || lower.contains("shop") || lower.contains("store") || lower.contains("amazon")) {
                projectType = "E_COMMERCE";
                detectedModules.addAll(List.of("Product Catalog", "Shopping Cart", "Checkout", "Order Tracking", "Seller Panel"));
                detectedFeatures.addAll(List.of("paymentGateway", "adminPanel", "reviews", "shipping", "multiVendor"));
            }
        }
        if (lower.contains("mobile app") || lower.contains("android") || lower.contains("ios") || lower.contains("iphone")) {
            projectType = "MOBILE_APP";
            if (lower.contains("android")) detectedFeatures.add("android");
            if (lower.contains("ios") || lower.contains("iphone")) detectedFeatures.add("ios");
            if (lower.contains("chat")) detectedFeatures.add("chat");
            if (lower.contains("map") || lower.contains("location")) detectedFeatures.add("maps");
            if (lower.contains("video") || lower.contains("upload")) detectedFeatures.add("videoUpload");
            detectedModules.addAll(List.of("User Login", "Push Notifications", "Admin Panel"));
        }
        if (lower.contains("erp") || lower.contains("enterprise")) {
            projectType = "ERP";
            detectedModules.addAll(List.of("Dashboard", "User Management", "Reports", "Analytics"));
            detectedFeatures.addAll(List.of("adminPanel", "reports", "analytics"));
        }
        if (lower.contains("crm")) {
            projectType = "CRM";
            detectedModules.addAll(List.of("Lead Management", "Contact Management", "Pipeline", "Reports"));
        }
        if (lower.contains("billing") || lower.contains("invoice")) {
            projectType = "BILLING_SOFTWARE";
            detectedModules.addAll(List.of("Invoice Generation", "Customer Management", "GST Reports", "Payment Tracking"));
            if (lower.contains("gst")) detectedFeatures.add("gstSupport");
        }

        // Detect infrastructure needs
        boolean needsDomain = lower.contains("domain") || lower.contains("my domain is") || lower.contains("domain name");
        boolean needsHosting = needsDomain || lower.contains("hosting") || lower.contains("server");
        boolean needsSSL = needsHosting || lower.contains("ssl") || lower.contains("https");
        boolean needsDatabase = lower.contains("database") || lower.contains("db") || lower.contains("data");

        // Extract specific requirements
        String domainName = "";
        if (lower.contains("domain")) {
            int idx = lower.indexOf("domain");
            String after = lower.substring(idx + 6).trim();
            if (after.contains("is ")) {
                domainName = after.substring(after.indexOf("is ") + 3).split("\\s+")[0];
            }
        }

        // Build the estimation
        Map<String, Object> costBreakdown = calculateDetailedCost(projectType, detectedFeatures, needsDomain, needsHosting, needsSSL, needsDatabase, domainName);
        Map<String, Object> timeline = generateTimeline(projectType, detectedFeatures, detectedModules);

        result.put("projectType", projectType);
        result.put("detectedModules", detectedModules);
        result.put("detectedFeatures", detectedFeatures);
        result.put("infrastructure", Map.of(
            "domain", needsDomain,
            "hosting", needsHosting,
            "ssl", needsSSL,
            "database", needsDatabase
        ));
        result.put("domainName", domainName);
        result.put("costBreakdown", costBreakdown);
        result.put("timeline", timeline);
        result.put("developmentEffort", estimateEffort(projectType, detectedFeatures));

        return result;
    }

    public Map<String, Object> calculateDetailedCost(String projectType, List<String> selectedFeatures,
            boolean needsDomain, boolean needsHosting, boolean needsSSL, boolean needsDatabase, String domainName) {
        Map<String, Object> breakdown = new LinkedHashMap<>();
        List<Map<String, Object>> costItems = new ArrayList<>();
        BigDecimal totalCost = BigDecimal.ZERO;

        // Domain cost
        if (needsDomain) {
            String ext = ".com";
            if (domainName.contains(".")) ext = domainName.substring(domainName.indexOf("."));
            Map<String, Object> domainCost = DOMAIN_COSTS.getOrDefault(ext, DOMAIN_COSTS.get(".com"));
            int reg = (int) domainCost.get("registration");
            int ren = (int) domainCost.get("renewal");
            costItems.add(Map.of("category", "Domain", "name", "Domain Registration (" + ext + ")", "amount", reg, "type", "oneTime"));
            costItems.add(Map.of("category", "Domain", "name", "Domain Renewal (Annual)", "amount", ren, "type", "annual"));
            totalCost = totalCost.add(BigDecimal.valueOf(reg + ren));
        }

        // Hosting cost
        if (needsHosting) {
            costItems.add(Map.of("category", "Hosting", "name", "Shared Hosting (Annual)", "amount", HOSTING_COSTS.get("SHARED"), "type", "annual"));
            totalCost = totalCost.add(BigDecimal.valueOf(HOSTING_COSTS.get("SHARED")));
        }

        // SSL cost
        if (needsSSL) {
            costItems.add(Map.of("category", "SSL", "name", "SSL Certificate (Annual)", "amount", 1999, "type", "annual"));
            totalCost = totalCost.add(BigDecimal.valueOf(1999));
        }

        // Database cost
        if (needsDatabase) {
            costItems.add(Map.of("category", "Database", "name", "Database Setup & Configuration", "amount", 5000, "type", "oneTime"));
            totalCost = totalCost.add(BigDecimal.valueOf(5000));
        }

        // Development cost based on project type
        int devBase = (int) PROJECT_PARAMS.getOrDefault(projectType, PROJECT_PARAMS.get("CUSTOM_SOFTWARE")).get("baseCost");
        int featureCost = 0;
        for (String feat : selectedFeatures) {
            if (feat.equals("android") || feat.equals("ios")) continue;
            featureCost += FEATURE_COSTS.getOrDefault(feat, 0);
        }

        int uiDesign = devBase / 5;
        int frontend = (int)(devBase * 0.3);
        int backend = (int)(devBase * 0.35);
        int testing = devBase / 10;
        int deployment = devBase / 20;

        costItems.add(Map.of("category", "Development", "name", "UI/UX Design", "amount", uiDesign, "type", "oneTime"));
        costItems.add(Map.of("category", "Development", "name", "Frontend Development", "amount", frontend, "type", "oneTime"));
        costItems.add(Map.of("category", "Development", "name", "Backend Development", "amount", backend, "type", "oneTime"));
        costItems.add(Map.of("category", "Development", "name", "Database Design", "amount", 5000, "type", "oneTime"));
        costItems.add(Map.of("category", "Development", "name", "Testing & QA", "amount", testing, "type", "oneTime"));
        costItems.add(Map.of("category", "Development", "name", "Deployment & Launch", "amount", deployment, "type", "oneTime"));

        totalCost = totalCost.add(BigDecimal.valueOf(devBase + featureCost));

        // Profit margin calculation
        BigDecimal profitMargin30 = totalCost.multiply(BigDecimal.valueOf(0.3)).setScale(0, RoundingMode.HALF_UP);
        BigDecimal profitMargin20 = totalCost.multiply(BigDecimal.valueOf(0.2)).setScale(0, RoundingMode.HALF_UP);
        BigDecimal finalPrice = totalCost.add(profitMargin30);

        // Maintenance
        int monthlyMaintenance = devBase / 20;
        int annualAmc = devBase / 3;

        costItems.add(Map.of("category", "Maintenance", "name", "Monthly Support", "amount", monthlyMaintenance, "type", "monthly"));
        costItems.add(Map.of("category", "Maintenance", "name", "Annual AMC", "amount", annualAmc, "type", "annual"));

        breakdown.put("items", costItems);
        breakdown.put("subtotal", totalCost.intValue());
        breakdown.put("profitMargin", profitMargin30.intValue());
        breakdown.put("minProfit", profitMargin20.intValue());
        breakdown.put("recommendedQuote", totalCost.add(profitMargin20).intValue());
        breakdown.put("bestQuote", finalPrice.intValue());
        breakdown.put("premiumQuote", totalCost.add(totalCost.multiply(BigDecimal.valueOf(0.5)).setScale(0, RoundingMode.HALF_UP)).intValue());
        breakdown.put("finalPrice", finalPrice.intValue());
        breakdown.put("totalCost", totalCost.intValue());

        return breakdown;
    }

    public Map<String, Object> estimateProject(String projectType, Map<String, Object> params) {
        Map<String, Object> result = new LinkedHashMap<>();
        @SuppressWarnings("unchecked")
        List<String> features = params.get("features") != null
                ? (List<String>) params.get("features") : new ArrayList<>();
        boolean needsDomain = params.containsKey("domain") && (Boolean) params.get("domain");
        boolean needsHosting = params.containsKey("hosting") && (Boolean) params.get("hosting");
        boolean needsSSL = params.containsKey("ssl") && (Boolean) params.get("ssl");
        boolean needsDatabase = params.containsKey("database") && (Boolean) params.get("database");
        String domainName = (String) params.getOrDefault("domainName", "");

        Map<String, Object> cost = calculateDetailedCost(projectType, features, needsDomain, needsHosting, needsSSL, needsDatabase, domainName);
        Map<String, Object> timeline = generateTimeline(projectType, features, new ArrayList<>());
        Map<String, Object> effort = estimateEffort(projectType, features);

        result.put("projectType", projectType);
        result.put("costBreakdown", cost);
        result.put("timeline", timeline);
        result.put("developmentEffort", effort);
        result.put("currency", params.getOrDefault("currency", "INR"));
        return result;
    }

    public Map<String, Object> checkUnderquoting(BigDecimal actualCost, BigDecimal quoteAmount, BigDecimal minProfit) {
        Map<String, Object> result = new LinkedHashMap<>();
        BigDecimal expectedMinPrice = actualCost.add(minProfit);
        BigDecimal profit = quoteAmount.subtract(actualCost);
        boolean isUnderquoting = profit.compareTo(minProfit) < 0;

        result.put("actualCost", actualCost.intValue());
        result.put("quoteAmount", quoteAmount.intValue());
        result.put("minProfit", minProfit.intValue());
        result.put("expectedProfit", profit.intValue());
        result.put("expectedMinPrice", expectedMinPrice.intValue());
        result.put("isLoss", isUnderquoting);

        if (isUnderquoting) {
            BigDecimal lossAmount = expectedMinPrice.subtract(quoteAmount);
            result.put("severity", lossAmount.compareTo(actualCost.multiply(new BigDecimal("0.1"))) > 0 ? "HIGH" : "LOW");
            result.put("recommendedPrice", expectedMinPrice.intValue());
            result.put("message", "Loss detected! Expected minimum: ₹" + expectedMinPrice.intValue() + ", Current: ₹" + quoteAmount.intValue());
        } else {
            result.put("severity", "NONE");
            result.put("message", "Quote is profitable");
        }
        return result;
    }

    public Map<String, Object> generateTimeline(String projectType, List<String> features, List<String> modules) {
        List<Map<String, Object>> phases = new ArrayList<>();
        int totalDays = 0;

        phases.add(Map.of("phase", "Requirement Analysis", "days", 3, "order", 1));
        phases.add(Map.of("phase", "UI/UX Design", "days", 5, "order", 2));
        int devDays = switch (projectType != null ? projectType.toUpperCase() : "CUSTOM_SOFTWARE") {
            case "WEBSITE" -> 15;
            case "MOBILE_APP" -> 25;
            case "ERP" -> 35;
            case "CRM" -> 20;
            case "E_COMMERCE" -> 20;
            case "BILLING_SOFTWARE" -> 15;
            default -> 20;
        };
        phases.add(Map.of("phase", "Development", "days", devDays, "order", 3));
        phases.add(Map.of("phase", "Testing & QA", "days", 5, "order", 4));
        phases.add(Map.of("phase", "Deployment", "days", 2, "order", 5));

        for (Map<String, Object> p : phases) totalDays += (int) p.get("days");

        return Map.of("phases", phases, "totalDays", totalDays, "weeks", Math.round(totalDays / 5.0));
    }

    public Map<String, Object> estimateEffort(String projectType, List<String> features) {
        int baseHours = switch (projectType != null ? projectType.toUpperCase() : "CUSTOM_SOFTWARE") {
            case "WEBSITE" -> 80;
            case "MOBILE_APP" -> 160;
            case "ERP" -> 240;
            case "CRM" -> 140;
            case "E_COMMERCE" -> 150;
            case "BILLING_SOFTWARE" -> 100;
            default -> 120;
        };
        int featureHours = features.size() * 5;
        int totalHours = baseHours + featureHours;

        return Map.of(
            "totalHours", totalHours,
            "uiDesign", totalHours / 6,
            "frontend", (int)(totalHours * 0.3),
            "backend", (int)(totalHours * 0.35),
            "testing", totalHours / 8,
            "deployment", totalHours / 12
        );
    }

    public Map<String, Object> generateProposal(String projectType, Map<String, Object> estimation, String clientName) {
        @SuppressWarnings("unchecked")
        Map<String, Object> costBreakdown = (Map<String, Object>) estimation.get("costBreakdown");
        @SuppressWarnings("unchecked")
        Map<String, Object> timeline = (Map<String, Object>) estimation.get("timeline");
        @SuppressWarnings("unchecked")
        List<String> modules = (List<String>) estimation.getOrDefault("detectedModules", new ArrayList<>());

        String proposalName = switch (projectType != null ? projectType.toUpperCase() : "CUSTOM_SOFTWARE") {
            case "WEBSITE" -> "Website Development";
            case "MOBILE_APP" -> "Mobile Application";
            case "ERP" -> "ERP System";
            case "CRM" -> "CRM Platform";
            case "E_COMMERCE" -> "E-Commerce Solution";
            case "BILLING_SOFTWARE" -> "Billing Software";
            default -> "Custom Software";
        };
        if (estimation.containsKey("domainName") && !((String)estimation.get("domainName")).isEmpty()) {
            proposalName = proposalName + " - " + estimation.get("domainName");
        }

        List<Map<String, String>> deliverables = new ArrayList<>();
        deliverables.add(Map.of("name", "Complete " + proposalName, "description", "Fully functional and tested"));
        deliverables.add(Map.of("name", "Source Code", "description", "Complete source code with documentation"));
        deliverables.add(Map.of("name", "Admin Panel", "description", "Full administrative interface"));
        deliverables.add(Map.of("name", "User Manual", "description", "Detailed user guide and documentation"));
        deliverables.add(Map.of("name", "1 Month Support", "description", "Free support for 30 days post-deployment"));

        return Map.of(
            "projectName", proposalName,
            "clientName", clientName != null ? clientName : "Client",
            "projectOverview", "Development of a comprehensive " + proposalName + " solution tailored to business requirements.",
            "modules", modules,
            "deliverables", deliverables,
            "technologyStack", List.of("Frontend", "Backend", "Database", "Server", "Security"),
            "timeline", timeline,
            "costBreakdown", costBreakdown,
            "termsConditions", List.of(
                "50% advance payment required to start",
                "30% on UI/UX approval",
                "20% on project completion",
                "1 month free support included",
                "Annual maintenance contract optional"
            )
        );
    }

    public Map<String, Object> detectUnderquoting(BigDecimal actualCost, BigDecimal quoteAmount, BigDecimal minProfit) {
        return checkUnderquoting(actualCost, quoteAmount, minProfit);
    }

    public List<Map<String, String>> generateDeliverables(String projectType) {
        List<Map<String, String>> deliverables = new ArrayList<>();
        deliverables.add(Map.of("name", "Responsive Website", "description", "Mobile-friendly, cross-browser compatible"));
        deliverables.add(Map.of("name", "Admin Panel", "description", "Complete admin dashboard"));
        deliverables.add(Map.of("name", "SSL Setup", "description", "SSL certificate installation"));
        deliverables.add(Map.of("name", "Hosting Setup", "description", "Server configuration and deployment"));
        if ("WEBSITE".equalsIgnoreCase(projectType) || "E_COMMERCE".equalsIgnoreCase(projectType)) {
            deliverables.add(Map.of("name", "Basic SEO", "description", "On-page SEO optimization"));
        }
        return deliverables;
    }
}
