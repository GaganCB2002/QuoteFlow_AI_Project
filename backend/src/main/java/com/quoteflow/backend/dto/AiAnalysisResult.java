package com.quoteflow.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class AiAnalysisResult {
    private String projectType;
    private String projectName;
    private String description;
    private String summary;
    private List<String> detectedModules;
    private List<String> detectedFeatures;
    private Infrastructure infrastructure;
    private CostBreakdown costBreakdown;
    private Timeline timeline;
    private List<QuotationItemDto> items;
    private List<String> deliverables;
    private List<String> termsConditions;
    private String technologyStack;
    private BigDecimal confidence;

    @Data
    public static class Infrastructure {
        private boolean domain;
        private String domainName;
        private boolean hosting;
        private String hostingType;
        private boolean database;
        private String databaseType;
        private boolean ssl;
    }

    @Data
    public static class CostBreakdown {
        private BigDecimal developmentCost;
        private BigDecimal infrastructureCost;
        private BigDecimal totalCost;
        private BigDecimal profitMargin;
        private BigDecimal finalQuote;
        private List<CostItem> items;

        @Data
        public static class CostItem {
            private String category;
            private String name;
            private BigDecimal amount;
            private String type;
        }
    }

    @Data
    public static class Timeline {
        private int totalDays;
        private List<Phase> phases;

        @Data
        public static class Phase {
            private String name;
            private int days;
        }
    }
}
