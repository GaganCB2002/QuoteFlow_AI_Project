package com.quoteflow.backend.service;

import com.quoteflow.backend.service.MarketResearchService.MarketResearchResult;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuotationReportService {

    public Map<String, Object> generateDetailedReport(
            String description,
            String projectType,
            String projectName,
            MarketResearchResult marketResearch,
            List<Map<String, Object>> items,
            Map<String, Object> costBreakdown) {

        Map<String, Object> report = new LinkedHashMap<>();

        report.put("reportGeneratedAt", new Date().toString());
        report.put("reportType", "COMPREHENSIVE_QUOTATION_REPORT");

        // Section 1: Executive Summary
        Map<String, Object> executiveSummary = new LinkedHashMap<>();
        executiveSummary.put("projectName", projectName);
        executiveSummary.put("projectType", projectType);
        executiveSummary.put("description", description);
        executiveSummary.put("marketPosition", marketResearch.competitivePrice() <= marketResearch.recommendedPrice()
            ? "COMPETITIVE" : "PREMIUM");
        executiveSummary.put("confidenceScore", calculateConfidence(description, projectType));
        report.put("executiveSummary", executiveSummary);

        // Section 2: Market Analysis
        Map<String, Object> marketAnalysis = new LinkedHashMap<>();
        marketAnalysis.put("marketDemand", marketResearch.marketInsights().get("marketDemand"));
        marketAnalysis.put("complexity", marketResearch.marketInsights().get("complexity"));
        marketAnalysis.put("timelineEstimate", marketResearch.marketInsights().get("timelineEstimate"));
        marketAnalysis.put("skillAvailability", marketResearch.marketInsights().get("skillAvailability"));
        marketAnalysis.put("marketPriceRange",
            "₹" + formatIndian(marketResearch.marketMinPrice()) + " - ₹" + formatIndian(marketResearch.marketMaxPrice()));
        marketAnalysis.put("competitivePrice", "₹" + formatIndian(marketResearch.competitivePrice()));
        report.put("marketAnalysis", marketAnalysis);

        // Section 3: Competitor Comparison
        List<Map<String, Object>> competitorComparison = new ArrayList<>();
        for (MarketResearchService.MarketPrice cp : marketResearch.competitorPrices()) {
            Map<String, Object> comp = new LinkedHashMap<>();
            comp.put("provider", cp.name());
            comp.put("price", "₹" + formatIndian(cp.price()));
            comp.put("priceValue", cp.price());
            competitorComparison.add(comp);
        }
        competitorComparison.add(Map.of(
            "provider", "QuoteFlow AI (Recommended)",
            "price", "₹" + formatIndian(marketResearch.recommendedPrice()),
            "priceValue", marketResearch.recommendedPrice(),
            "isRecommended", true
        ));
        report.put("competitorComparison", competitorComparison);

        // Section 4: Module-wise Breakdown
        List<Map<String, Object>> moduleBreakdown = new ArrayList<>();
        for (MarketResearchService.MarketPrice mp : marketResearch.modulePrices()) {
            Map<String, Object> mod = new LinkedHashMap<>();
            mod.put("module", mp.name());
            mod.put("estimatedCost", "₹" + formatIndian(mp.price()));
            mod.put("costValue", mp.price());
            moduleBreakdown.add(mod);
        }
        report.put("moduleBreakdown", moduleBreakdown);

        // Section 5: Line Items
        report.put("lineItems", items);

        // Section 6: Cost Summary
        Map<String, Object> costSummary = new LinkedHashMap<>();
        if (costBreakdown != null) {
            costSummary.putAll(costBreakdown);
        }
        costSummary.put("totalModuleCost", "₹" + formatIndian(marketResearch.totalModuleCost()));
        costSummary.put("infrastructureCost", "₹" + formatIndian(marketResearch.infrastructureCost()));
        costSummary.put("totalProjectCost", "₹" + formatIndian(marketResearch.totalProjectCost()));
        costSummary.put("recommendedQuote", "₹" + formatIndian(marketResearch.recommendedPrice()));
        costSummary.put("gstApplicable", "18% GST will be added to the final amount");
        report.put("costSummary", costSummary);

        // Section 7: Deliverables
        report.put("deliverables", generateDeliverables(projectType, marketResearch.detectedModules()));

        // Section 8: Payment Terms
        report.put("paymentTerms", List.of(
            Map.of("milestone", "Project Kickoff", "percentage", 40, "condition", "Advance payment to start development"),
            Map.of("milestone", "UI/UX Approval", "percentage", 30, "condition", "After design approval"),
            Map.of("milestone", "Project Completion", "percentage", 30, "condition", "After UAT and deployment"),
            Map.of("milestone", "Annual Maintenance", "percentage", 0, "condition", "Optional AMC at 15% of project cost/year")
        ));

        // Section 9: Timeline
        report.put("timeline", generateDetailedTimeline(projectType, marketResearch.detectedModules().size()));

        return report;
    }

    public List<Map<String, String>> generateDeliverables(String projectType, List<String> modules) {
        List<Map<String, String>> deliverables = new ArrayList<>();
        deliverables.add(Map.of("name", "Fully Functional " + projectType, "description", "Complete, tested, and deployed solution"));
        deliverables.add(Map.of("name", "Admin Dashboard", "description", "Full administrative interface with analytics"));
        deliverables.add(Map.of("name", "Source Code", "description", "Complete source code with version control history"));
        deliverables.add(Map.of("name", "Technical Documentation", "description", "API docs, architecture docs, user manuals"));
        deliverables.add(Map.of("name", "30 Days Support", "description", "Free bug fixes and support for 30 days post-launch"));
        deliverables.add(Map.of("name", "Security Audit", "description", "Basic security audit and vulnerability assessment"));

        for (String module : modules) {
            deliverables.add(Map.of("name", module, "description", module + " module with full functionality"));
        }

        return deliverables;
    }

    private List<Map<String, Object>> generateDetailedTimeline(String projectType, int moduleCount) {
        int devWeeks = switch (projectType) {
            case "ERP" -> 12; case "MOBILE_APP" -> 10;
            case "E_COMMERCE" -> 8; case "CRM" -> 8;
            case "BILLING_SOFTWARE" -> 6; case "WEBSITE" -> 4;
            default -> 8;
        };
        devWeeks += moduleCount / 4;

        List<Map<String, Object>> phases = new ArrayList<>();
        phases.add(Map.of("phase", "Requirement Analysis", "duration", "1-2 weeks", "details", "Deep dive into requirements, finalize scope"));
        phases.add(Map.of("phase", "UI/UX Design", "duration", "2-3 weeks", "details", "Wireframes, mockups, design approval"));
        phases.add(Map.of("phase", "Development Phase " + (devWeeks > 8 ? "I" : ""), "duration", (devWeeks/2) + " weeks", "details", "Core development, module implementation"));
        if (devWeeks > 8) {
            phases.add(Map.of("phase", "Development Phase II", "duration", (devWeeks - devWeeks/2) + " weeks", "details", "Advanced features, integrations"));
        }
        phases.add(Map.of("phase", "Testing & QA", "duration", "2-3 weeks", "details", "Unit testing, integration testing, UAT"));
        phases.add(Map.of("phase", "Deployment & Launch", "duration", "1 week", "details", "Server setup, deployment, go-live"));
        phases.add(Map.of("phase", "Post-Launch Support", "duration", "4 weeks", "details", "Bug fixes, performance optimization"));

        return phases;
    }

    private int calculateConfidence(String description, String projectType) {
        int score = 85;
        if (description.length() < 20) score -= 20;
        else if (description.length() > 100) score += 5;

        if (projectType != null && !projectType.isEmpty()) score += 5;

        int detailIndicators = 0;
        if (description.contains("module") || description.contains("feature")) detailIndicators++;
        if (description.contains("user") || description.contains("admin")) detailIndicators++;
        if (description.contains("payment") || description.contains("gateway")) detailIndicators++;
        if (description.contains("report") || description.contains("analytics")) detailIndicators++;
        score += detailIndicators * 2;

        return Math.min(99, Math.max(40, score));
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
