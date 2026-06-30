package com.quoteflow.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class AiAgentResponse {
    private String quoteNo;
    private String projectType;
    private String projectName;
    private String description;
    private String summary;
    private BigDecimal confidenceScore;

    private MarketResearchData marketResearch;
    private CostBreakdownData costBreakdown;
    private TieredPricingData tieredPricing;
    private FeatureSuggestionData featureSuggestions;
    private List<Map<String, Object>> lineItems;
    private List<String> deliverables;
    private List<Map<String, Object>> paymentTerms;
    private List<Map<String, Object>> timeline;
    private List<Map<String, Object>> competitorComparison;
    private Map<String, String> marketInsights;
    private StorageInfo storage;

    @Data
    public static class MarketResearchData {
        private String marketDemand;
        private String complexity;
        private String timelineEstimate;
        private String marketPriceRange;
        private int marketMinPrice;
        private int marketMaxPrice;
        private int competitivePrice;
        private List<String> detectedModules;
        private List<Map<String, Object>> modulePrices;
    }

    @Data
    public static class CostBreakdownData {
        private BigDecimal totalModuleCost;
        private BigDecimal infrastructureCost;
        private BigDecimal totalProjectCost;
        private BigDecimal profitMargin;
        private BigDecimal finalQuote;
        private BigDecimal gstAmount;
        private BigDecimal grandTotal;
        private String recommendedTier;
        private List<Map<String, Object>> items;
    }

    @Data
    public static class TieredPricingData {
        private PricingTierInfo basic;
        private PricingTierInfo standard;
        private PricingTierInfo premium;
        private String recommendation;
        private int costPrice;

        @Data
        public static class PricingTierInfo {
            private String name;
            private String description;
            private double marginPct;
            private int totalCost;
            private int profit;
            private int priceBeforeGst;
            private int gstAmount;
            private int grandTotal;
            private int customerSavings;
            private String targetCustomer;
            private int adminRevenuePerSale;
            private Map<String, Object> breakdown;
        }
    }

    @Data
    public static class FeatureSuggestionData {
        private List<SuggestedFeatureInfo> highPriorityFeatures;
        private List<SuggestedFeatureInfo> mediumPriorityFeatures;
        private int totalPotentialRevenue;
        private int totalPotentialProfit;
        private int totalCustomerValue;

        @Data
        public static class SuggestedFeatureInfo {
            private String name;
            private String id;
            private String category;
            private int sellingPrice;
            private int costPrice;
            private int adminProfit;
            private double profitMarginPct;
            private String description;
            private String priority;
            private String businessValue;
            private String estimatedSavings;
            private String recommendationReason;
        }
    }

    @Data
    public static class StorageInfo {
        private String quoteNo;
        private String folderPath;
        private List<String> files;
        private Map<String, Object> metadata;
    }
}
