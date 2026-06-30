package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.AiAgentResponse;
import com.quoteflow.backend.dto.AiAnalysisResult;
import com.quoteflow.backend.dto.AiQuotationRequest;
import com.quoteflow.backend.service.FeatureSuggesterService.FeatureSuggestionResult;
import com.quoteflow.backend.service.FeatureSuggesterService.SuggestedFeature;
import com.quoteflow.backend.service.LocalFileStorageService.QuotationFileSet;
import com.quoteflow.backend.service.MarketResearchService.MarketResearchResult;
import com.quoteflow.backend.service.PricingTierService.PricingTier;
import com.quoteflow.backend.service.PricingTierService.TieredPricingResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiAgentService {

    private final AiService aiService;
    private final MarketResearchService marketResearchService;
    private final LocalFileStorageService fileStorageService;
    private final QuotationReportService reportService;
    private final PricingTierService pricingTierService;
    private final FeatureSuggesterService featureSuggesterService;
    private final WebSearchService webSearchService;
    private final SelfLearningService selfLearningService;

    public AiAgentResponse processRequirement(AiQuotationRequest request) {
        AiAnalysisResult aiAnalysis;
        try {
            aiAnalysis = aiService.analyzeRequirements(request);
        } catch (Exception e) {
            aiAnalysis = aiService.analyzeWithRules(request);
        }

        String projectType = aiAnalysis.getProjectType() != null
            ? aiAnalysis.getProjectType() : "CUSTOM";
        String projectName = aiAnalysis.getProjectName() != null
            ? aiAnalysis.getProjectName() : "Project";

        Map<String, Object> webPricing = webSearchService.getMarketPricing(projectType, request.getDescription());
        Map<String, Object> predictedPrice = selfLearningService.predictPrice(projectType, request.getDescription());

        MarketResearchResult marketResearch = marketResearchService.research(
            request.getDescription(), projectType);

        boolean usedWebSearch = "web-search".equals(webPricing.get("source"));
        int webMinPrice = (int) webPricing.getOrDefault("marketMinPrice", 0);
        int webMaxPrice = (int) webPricing.getOrDefault("marketMaxPrice", 0);
        int researchMinPrice = marketResearch.marketMinPrice();
        int researchMaxPrice = marketResearch.marketMaxPrice();
        int baseMinPrice = webMinPrice > 0 ? webMinPrice : researchMinPrice;
        int baseMaxPrice = webMaxPrice > 0 ? webMaxPrice : researchMaxPrice;

        int predictedMid = 0;
        if (Boolean.TRUE.equals(predictedPrice.get("predicted"))) {
            predictedMid = (int) predictedPrice.getOrDefault("midPrice", 0);
        }

        Map<String, String> enhancedInsights = new LinkedHashMap<>(marketResearch.marketInsights());
        enhancedInsights.put("webResearched", String.valueOf(usedWebSearch));
        enhancedInsights.put("webMinPrice", "₹" + formatIndian(webMinPrice));
        enhancedInsights.put("webMaxPrice", "₹" + formatIndian(webMaxPrice));
        enhancedInsights.put("researchMinPrice", "₹" + formatIndian(researchMinPrice));
        enhancedInsights.put("researchMaxPrice", "₹" + formatIndian(researchMaxPrice));
        enhancedInsights.put("mlPredicted", String.valueOf(predictedMid > 0));
        if (predictedMid > 0) {
            enhancedInsights.put("mlMidPrice", "₹" + formatIndian(predictedMid));
        }
        enhancedInsights.put("pricingSource", usedWebSearch ? "Web Research (Google)" : "Knowledge Base");

        MarketResearchResult adjustedResearch = new MarketResearchResult(
            marketResearch.projectType(),
            marketResearch.projectDisplayName(),
            marketResearch.description(),
            baseMinPrice,
            baseMaxPrice,
            marketResearch.recommendedPrice(),
            marketResearch.competitivePrice(),
            marketResearch.detectedModules(),
            marketResearch.modulePrices(),
            marketResearch.competitorPrices(),
            marketResearch.totalModuleCost(),
            marketResearch.infrastructureCost(),
            marketResearch.totalProjectCost(),
            enhancedInsights
        );

        AiAgentResponse.CostBreakdownData costBreakdown = buildCostBreakdown(adjustedResearch);
        TieredPricingResult tieredPricing = pricingTierService.calculateTiers(costBreakdown.getTotalProjectCost().intValue());

        selfLearningService.learn(
            projectType, request.getDescription(),
            adjustedResearch.totalProjectCost(),
            tieredPricing.standard().grandTotal(),
            true
        );

        webSearchService.recordTrainingData(
            request.getDescription(), projectType,
            webSearchService.searchWeb(request.getDescription(), projectType),
            usedWebSearch
        );

        List<Map<String, Object>> lineItems = generateLineItems(adjustedResearch, costBreakdown);

        FeatureSuggestionResult featureSuggestions = featureSuggesterService.suggestFeatures(
            projectType, request.getDescription(),
            costBreakdown.getTotalProjectCost().intValue(),
            tieredPricing.standard().priceBeforeGst()
        );

        String quoteNo = "QT-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        Map<String, Object> reportData = reportService.generateDetailedReport(
            request.getDescription(), projectType, projectName,
            adjustedResearch, lineItems, buildCostMap(costBreakdown, tieredPricing));

        String companyName = request.getCustomerCompany() != null
            ? request.getCustomerCompany() : "Client";
        QuotationFileSet fileSet = fileStorageService.saveQuotation(
            projectType, projectName, companyName, quoteNo,
            reportData, Map.of("marketData", adjustedResearch, "aiAnalysis", aiAnalysis,
                "tieredPricing", tieredPricing, "featureSuggestions", featureSuggestions,
                "webResearch", webPricing, "mlModel", predictedPrice),
            lineItems);

        AiAgentResponse response = new AiAgentResponse();
        response.setQuoteNo(quoteNo);
        response.setProjectType(projectType);
        response.setProjectName(projectName);
        response.setDescription(request.getDescription());
        response.setSummary(aiAnalysis.getSummary() != null
            ? aiAnalysis.getSummary() : adjustedResearch.description());
        response.setConfidenceScore(BigDecimal.valueOf(
            aiAnalysis.getConfidence() != null ? aiAnalysis.getConfidence().intValue()
                : calculateConfidence(request.getDescription())));

        response.setMarketResearch(buildMarketResearchData(adjustedResearch));
        response.setCostBreakdown(costBreakdown);
        response.setTieredPricing(buildTieredPricingData(tieredPricing, adjustedResearch.totalModuleCost()));
        response.setFeatureSuggestions(buildFeatureSuggestionData(featureSuggestions));
        response.setLineItems(lineItems);
        response.setDeliverables(aiAnalysis.getDeliverables() != null
            ? aiAnalysis.getDeliverables()
            : reportService.generateDeliverables(projectType, adjustedResearch.detectedModules())
                .stream().map(m -> m.get("name")).collect(Collectors.toList()));
        response.setPaymentTerms((List<Map<String, Object>>) reportData.get("paymentTerms"));
        response.setTimeline((List<Map<String, Object>>) reportData.get("timeline"));
        response.setCompetitorComparison((List<Map<String, Object>>) reportData.get("competitorComparison"));
        response.setMarketInsights(adjustedResearch.marketInsights());

        AiAgentResponse.StorageInfo storage = new AiAgentResponse.StorageInfo();
        storage.setQuoteNo(quoteNo);
        storage.setFolderPath(fileSet.folderPath());
        storage.setFiles(fileSet.files());
        storage.setMetadata(fileSet.metadata());
        response.setStorage(storage);

        return response;
    }

    public List<LocalFileStorageService.QuotationSummary> getHistory() {
        return fileStorageService.listAllQuotations();
    }

    public Map<String, Object> loadQuotation(String quoteNo) {
        return fileStorageService.loadQuotation(quoteNo);
    }

    public FeatureSuggestionResult getSuggestions(String projectType, String description, int budget) {
        return featureSuggesterService.suggestFeatures(projectType, description, budget, budget);
    }

    private AiAgentResponse.CostBreakdownData buildCostBreakdown(MarketResearchResult marketResearch) {
        BigDecimal totalModuleCost = BigDecimal.valueOf(marketResearch.totalModuleCost());
        BigDecimal infraCost = BigDecimal.valueOf(marketResearch.infrastructureCost());
        BigDecimal totalCost = BigDecimal.valueOf(marketResearch.totalProjectCost());

        BigDecimal profitMargin = totalCost.multiply(new BigDecimal("0.25")).setScale(0, RoundingMode.HALF_UP);
        BigDecimal finalQuote = totalCost.add(profitMargin);
        BigDecimal gstAmount = finalQuote.multiply(new BigDecimal("0.18")).setScale(0, RoundingMode.HALF_UP);
        BigDecimal grandTotal = finalQuote.add(gstAmount);

        AiAgentResponse.CostBreakdownData cb = new AiAgentResponse.CostBreakdownData();
        cb.setTotalModuleCost(totalModuleCost);
        cb.setInfrastructureCost(infraCost);
        cb.setTotalProjectCost(totalCost);
        cb.setProfitMargin(profitMargin);
        cb.setFinalQuote(finalQuote);
        cb.setGstAmount(gstAmount);
        cb.setGrandTotal(grandTotal);
        cb.setRecommendedTier("Standard");

        List<Map<String, Object>> items = new ArrayList<>();
        items.add(Map.of("category", "Development", "name", "Module Development",
            "amount", totalModuleCost, "type", "oneTime"));
        items.add(Map.of("category", "Infrastructure", "name", "Hosting, Domain & SSL",
            "amount", infraCost, "type", "annual"));
        items.add(Map.of("category", "Profit", "name", "Service & Support Margin (25%)",
            "amount", profitMargin, "type", "included"));
        items.add(Map.of("category", "Tax", "name", "GST (18%)",
            "amount", gstAmount, "type", "tax"));
        items.add(Map.of("category", "Total", "name", "Grand Total",
            "amount", grandTotal, "type", "final"));
        cb.setItems(items);

        return cb;
    }

    private List<Map<String, Object>> generateLineItems(
            MarketResearchResult marketResearch, AiAgentResponse.CostBreakdownData costBreakdown) {
        List<Map<String, Object>> items = new ArrayList<>();
        for (MarketResearchService.MarketPrice mp : marketResearch.modulePrices()) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("itemName", mp.name());
            item.put("description", mp.name() + " module development and integration");
            item.put("quantity", 1);
            item.put("unitPrice", mp.price());
            item.put("total", mp.price());
            item.put("hsn", "9983");
            item.put("editable", true);
            items.add(item);
        }
        if (marketResearch.infrastructureCost() > 0) {
            Map<String, Object> infra = new LinkedHashMap<>();
            infra.put("itemName", "Infrastructure Setup");
            infra.put("description", "Domain, hosting, SSL, and server configuration");
            infra.put("quantity", 1);
            infra.put("unitPrice", marketResearch.infrastructureCost());
            infra.put("total", marketResearch.infrastructureCost());
            infra.put("hsn", "9983");
            infra.put("editable", true);
            items.add(infra);
        }
        return items;
    }

    private AiAgentResponse.TieredPricingData buildTieredPricingData(TieredPricingResult tp, int totalModuleCost) {
        AiAgentResponse.TieredPricingData data = new AiAgentResponse.TieredPricingData();
        data.setCostPrice(tp.costPrice());
        data.setRecommendation(tp.recommendation());

        data.setBasic(buildTierInfo(tp.basic(), totalModuleCost));
        data.setStandard(buildTierInfo(tp.standard(), totalModuleCost));
        data.setPremium(buildTierInfo(tp.premium(), totalModuleCost));

        return data;
    }

    private AiAgentResponse.TieredPricingData.PricingTierInfo buildTierInfo(PricingTier tier, int baseCost) {
        AiAgentResponse.TieredPricingData.PricingTierInfo info = new AiAgentResponse.TieredPricingData.PricingTierInfo();
        info.setName(tier.name());
        info.setDescription(tier.description());
        info.setMarginPct(tier.marginPct());
        info.setTotalCost(tier.totalCost());
        info.setProfit(tier.profit());
        info.setPriceBeforeGst(tier.priceBeforeGst());
        info.setGstAmount(tier.gstAmount());
        info.setGrandTotal(tier.grandTotal());
        info.setCustomerSavings(tier.customerSavings());
        info.setTargetCustomer(tier.targetCustomer());
        info.setAdminRevenuePerSale(tier.adminRevenuePerSale());

        info.setBreakdown(Map.of(
            "baseCost", baseCost,
            "profit", tier.profit(),
            "profitPct", String.format("%.0f%%", tier.marginPct()),
            "subtotal", tier.priceBeforeGst(),
            "gst", tier.gstAmount(),
            "grandTotal", tier.grandTotal(),
            "adminEarns", tier.profit(),
            "customerPays", tier.grandTotal()
        ));

        return info;
    }

    private AiAgentResponse.FeatureSuggestionData buildFeatureSuggestionData(FeatureSuggestionResult fs) {
        AiAgentResponse.FeatureSuggestionData data = new AiAgentResponse.FeatureSuggestionData();
        data.setTotalPotentialRevenue(fs.totalPotentialRevenue());
        data.setTotalPotentialProfit(fs.totalPotentialProfit());
        data.setTotalCustomerValue(fs.totalCustomerValue());

        data.setHighPriorityFeatures(fs.highPriorityFeatures().stream()
            .map(this::mapSuggestedFeature).collect(Collectors.toList()));
        data.setMediumPriorityFeatures(fs.mediumPriorityFeatures().stream()
            .map(this::mapSuggestedFeature).collect(Collectors.toList()));

        return data;
    }

    private AiAgentResponse.FeatureSuggestionData.SuggestedFeatureInfo mapSuggestedFeature(SuggestedFeature sf) {
        AiAgentResponse.FeatureSuggestionData.SuggestedFeatureInfo info =
            new AiAgentResponse.FeatureSuggestionData.SuggestedFeatureInfo();
        info.setName(sf.name());
        info.setId(sf.id());
        info.setCategory(sf.category());
        info.setSellingPrice(sf.sellingPrice());
        info.setCostPrice(sf.costPrice());
        info.setAdminProfit(sf.adminProfit());
        info.setProfitMarginPct(sf.profitMarginPct());
        info.setDescription(sf.description());
        info.setPriority(sf.priority());
        info.setBusinessValue(sf.businessValue());
        info.setEstimatedSavings(sf.estimatedSavings());
        info.setRecommendationReason(sf.recommendationReason());
        return info;
    }

    private AiAgentResponse.MarketResearchData buildMarketResearchData(MarketResearchResult mr) {
        AiAgentResponse.MarketResearchData data = new AiAgentResponse.MarketResearchData();
        data.setMarketDemand(mr.marketInsights().get("marketDemand"));
        data.setComplexity(mr.marketInsights().get("complexity"));
        data.setTimelineEstimate(mr.marketInsights().get("timelineEstimate"));
        data.setMarketPriceRange("₹" + formatIndian(mr.marketMinPrice()) + " - ₹" + formatIndian(mr.marketMaxPrice()));
        data.setMarketMinPrice(mr.marketMinPrice());
        data.setMarketMaxPrice(mr.marketMaxPrice());
        data.setCompetitivePrice(mr.competitivePrice());
        data.setDetectedModules(mr.detectedModules());
        data.setModulePrices(mr.modulePrices().stream()
            .map(mp -> Map.<String, Object>of("name", mp.name(), "price", mp.price()))
            .collect(Collectors.toList()));
        return data;
    }

    private Map<String, Object> buildCostMap(AiAgentResponse.CostBreakdownData cb, TieredPricingResult tp) {
        return Map.of(
            "totalModuleCost", cb.getTotalModuleCost(),
            "infrastructureCost", cb.getInfrastructureCost(),
            "totalProjectCost", cb.getTotalProjectCost(),
            "profitMargin", cb.getProfitMargin(),
            "finalQuote", cb.getFinalQuote(),
            "gstAmount", cb.getGstAmount(),
            "grandTotal", cb.getGrandTotal(),
            "recommendedQuote", tp.standard().grandTotal(),
            "gstApplicable", "18% GST applicable"
        );
    }

    private int calculateConfidence(String description) {
        if (description == null || description.trim().isEmpty()) return 40;
        int score = 75;
        if (description.length() > 50) score += 10;
        if (description.contains("module") || description.contains("feature")) score += 5;
        if (description.contains("user") || description.contains("admin")) score += 5;
        if (description.contains("payment") || description.contains("fee")) score += 5;
        return Math.min(99, score);
    }

    private String formatIndian(int amount) {
        String s = String.valueOf(amount);
        if (s.length() <= 3) return s;
        int lastThree = s.length() - 3;
        String after = s.substring(lastThree);
        String before = s.substring(0, lastThree);
        StringBuilder sb = new StringBuilder();
        while (before.length() > 2) {
            sb.insert(0, "," + before.substring(before.length() - 2));
            before = before.substring(0, before.length() - 2);
        }
        if (before.length() > 0) sb.insert(0, before);
        sb.append(",").append(after);
        return sb.toString();
    }
}
