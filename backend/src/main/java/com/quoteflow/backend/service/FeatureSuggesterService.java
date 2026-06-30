package com.quoteflow.backend.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FeatureSuggesterService {

    private static final List<AdvancedFeature> ALL_FEATURES = List.of(
        new AdvancedFeature("AI Chatbot", "chatbot", "Website", 35000, 25000,
            "24/7 automated customer support", "HIGH", "Reduces support staff cost by 60%", "₹50,000/yr savings"),
        new AdvancedFeature("Mobile App", "mobile_app", "Mobile", 50000, 35000,
            "Android + iOS cross-platform app", "HIGH", "Increases customer reach by 3x", "₹1,00,000+ additional revenue"),
        new AdvancedFeature("SMS Gateway", "sms_gateway", "Communication", 15000, 8000,
            "Bulk SMS for notifications & alerts", "MEDIUM", "95% open rate vs 20% email", "₹15,000/yr communication savings"),
        new AdvancedFeature("WhatsApp Integration", "whatsapp", "Communication", 20000, 12000,
            "WhatsApp Business API integration", "HIGH", "80% customer preference for WhatsApp", "₹25,000/yr engagement savings"),
        new AdvancedFeature("Advanced Analytics", "analytics_advanced", "Analytics", 30000, 18000,
            "Real-time dashboards, predictive analytics", "MEDIUM", "Data-driven decisions increase revenue 20%", "₹50,000/yr value"),
        new AdvancedFeature("Biometric Auth", "biometric", "Security", 15000, 8000,
            "Fingerprint/face recognition login", "MEDIUM", "Enterprise-grade security compliance", "₹20,000/yr compliance savings"),
        new AdvancedFeature("Multi-Language", "multi_lang", "Localization", 20000, 12000,
            "Support for 10+ Indian languages", "HIGH", "5x userbase expansion in tier-2/3 cities", "₹75,000/yr market expansion"),
        new AdvancedFeature("Email Marketing", "email_marketing", "Marketing", 15000, 8000,
            "Automated email campaigns & newsletters", "MEDIUM", "42x ROI on email marketing", "₹30,000/yr marketing savings"),
        new AdvancedFeature("Payment Links", "payment_links", "Payments", 10000, 5000,
            "WhatsApp/email payment links", "HIGH", "30% faster payment collection", "₹20,000/yr collection savings"),
        new AdvancedFeature("E-Invoicing", "einvoice", "Compliance", 15000, 8000,
            "GST e-invoice & e-way bill generation", "HIGH", "Mandatory compliance from 2025", "₹25,000/yr penalty avoidance"),
        new AdvancedFeature("Video Consultation", "video_call", "Communication", 25000, 15000,
            "In-app video/audio calls", "MEDIUM", "Premium service offering upsell", "₹40,000/yr additional revenue"),
        new AdvancedFeature("Loyalty Program", "loyalty", "Engagement", 20000, 10000,
            "Points, rewards & referral system", "MEDIUM", "50% higher customer retention", "₹35,000/yr retention value"),
        new AdvancedFeature("Auto Backup", "auto_backup", "Infrastructure", 10000, 5000,
            "Automated daily cloud backups", "HIGH", "Zero data loss guarantee", "₹15,000/yr data protection"),
        new AdvancedFeature("Performance Audit", "perf_audit", "Optimization", 8000, 4000,
            "Speed optimization & security audit", "MEDIUM", "53% of users leave slow sites", "₹20,000/yr revenue recovery"),
        new AdvancedFeature("Custom Reports", "custom_reports", "Analytics", 18000, 10000,
            "Custom report builder with export", "MEDIUM", "Save 10 hrs/week in reporting", "₹30,000/yr productivity savings")
    );

    private static final Map<String, List<String>> PROJECT_FEATURE_MAP = Map.of(
        "ERP", List.of("chatbot", "mobile_app", "sms_gateway", "whatsapp", "analytics_advanced", "biometric", "multi_lang", "einvoice", "custom_reports"),
        "WEBSITE", List.of("chatbot", "whatsapp", "email_marketing", "multi_lang", "analytics_advanced", "auto_backup", "perf_audit"),
        "MOBILE_APP", List.of("chatbot", "whatsapp", "payment_links", "video_call", "loyalty", "analytics_advanced", "push_notification"),
        "E_COMMERCE", List.of("whatsapp", "payment_links", "loyalty", "email_marketing", "einvoice", "multi_lang", "auto_backup", "chatbot"),
        "CRM", List.of("whatsapp", "email_marketing", "analytics_advanced", "custom_reports", "video_call", "loyalty"),
        "BILLING_SOFTWARE", List.of("einvoice", "sms_gateway", "whatsapp", "payment_links", "custom_reports", "auto_backup"),
        "CUSTOM_SOFTWARE", List.of("chatbot", "mobile_app", "analytics_advanced", "multi_lang", "auto_backup", "custom_reports")
    );

    public record AdvancedFeature(
        String name, String id, String category, int sellingPrice, int costPrice,
        String description, String priority, String businessValue, String estimatedSavings
    ) {
        public int getAdminProfit() { return sellingPrice - costPrice; }
        public double getProfitMarginPct() {
            return costPrice > 0 ? ((double)(sellingPrice - costPrice) / sellingPrice) * 100 : 0;
        }
    }

    public record SuggestedFeature(
        String name, String id, String category, int sellingPrice, int costPrice,
        int adminProfit, double profitMarginPct, String description,
        String priority, String businessValue, String estimatedSavings,
        String recommendationReason
    ) {}

    public record FeatureSuggestionResult(
        List<SuggestedFeature> highPriorityFeatures,
        List<SuggestedFeature> mediumPriorityFeatures,
        List<SuggestedFeature> lowPriorityFeatures,
        int totalPotentialRevenue,
        int totalPotentialProfit,
        int totalCustomerValue
    ) {}

    public FeatureSuggestionResult suggestFeatures(String projectType, String description,
                                                     int currentQuoteTotal, int customerBudget) {
        List<String> relevantIds = PROJECT_FEATURE_MAP.getOrDefault(
            projectType, PROJECT_FEATURE_MAP.get("CUSTOM_SOFTWARE"));

        String lower = description.toLowerCase();
        List<AdvancedFeature> alreadyMentioned = ALL_FEATURES.stream()
            .filter(f -> lower.contains(f.name().toLowerCase().substring(0, Math.min(5, f.name().length()))))
            .collect(Collectors.toList());

        Set<String> excludeIds = alreadyMentioned.stream().map(AdvancedFeature::id).collect(Collectors.toSet());

        List<SuggestedFeature> suggestions = ALL_FEATURES.stream()
            .filter(f -> relevantIds.contains(f.id()) && !excludeIds.contains(f.id()))
            .map(f -> {
                String reason = generateRecommendationReason(f, projectType, currentQuoteTotal);
                return new SuggestedFeature(
                    f.name(), f.id(), f.category(),
                    f.sellingPrice(), f.costPrice(),
                    f.getAdminProfit(), f.getProfitMarginPct(),
                    f.description(), f.priority(), f.businessValue(),
                    f.estimatedSavings(), reason
                );
            })
            .sorted((a, b) -> {
                int priorityOrder = "HIGH".equals(a.priority()) ? 0 : "MEDIUM".equals(a.priority()) ? 1 : 2;
                int priorityOrderB = "HIGH".equals(b.priority()) ? 0 : "MEDIUM".equals(b.priority()) ? 1 : 2;
                if (priorityOrder != priorityOrderB) return Integer.compare(priorityOrder, priorityOrderB);
                return Integer.compare(b.adminProfit(), a.adminProfit());
            })
            .collect(Collectors.toList());

        List<SuggestedFeature> high = suggestions.stream()
            .filter(s -> "HIGH".equals(s.priority())).collect(Collectors.toList());
        List<SuggestedFeature> medium = suggestions.stream()
            .filter(s -> "MEDIUM".equals(s.priority())).collect(Collectors.toList());
        List<SuggestedFeature> low = suggestions.stream()
            .filter(s -> !"HIGH".equals(s.priority()) && !"MEDIUM".equals(s.priority()))
            .collect(Collectors.toList());

        int totalRevenue = suggestions.stream().mapToInt(SuggestedFeature::sellingPrice).sum();
        int totalProfit = suggestions.stream().mapToInt(SuggestedFeature::adminProfit).sum();
        int totalValue = suggestions.stream().mapToInt(s -> s.sellingPrice() * 3).sum();

        return new FeatureSuggestionResult(high, medium, low, totalRevenue, totalProfit, totalValue);
    }

    public List<SavedSuggestion> getDefaultSuggestionsForType(String projectType) {
        List<String> relevantIds = PROJECT_FEATURE_MAP.getOrDefault(
            projectType, PROJECT_FEATURE_MAP.get("CUSTOM_SOFTWARE"));
        return ALL_FEATURES.stream()
            .filter(f -> relevantIds.contains(f.id()))
            .map(f -> new SavedSuggestion(f.id(), f.name(), f.sellingPrice(), true))
            .collect(Collectors.toList());
    }

    public record SavedSuggestion(String id, String name, int price, boolean active) {}

    private String generateRecommendationReason(AdvancedFeature f, String projectType, int currentTotal) {
        return switch (f.id()) {
            case "chatbot" -> "Reduces support costs by 60% while generating ₹50,000/yr in savings for client";
            case "mobile_app" -> "3x customer reach expansion, ₹1,00,000+ additional annual revenue potential";
            case "whatsapp" -> "80% of customers prefer WhatsApp - increases engagement by 5x";
            case "sms_gateway" -> "95% open rate ensures critical notifications are never missed";
            case "analytics_advanced" -> "Data-driven decisions can increase client revenue by 20%";
            case "multi_lang" -> "Opens tier-2/3 city markets, 5x potential userbase expansion";
            case "einvoice" -> "Government compliance mandate - saves ₹25,000/yr in penalty risk";
            case "loyalty" -> "50% higher retention = 2x customer lifetime value";
            case "payment_links" -> "30% faster payment collection improves cash flow";
            case "video_call" -> "Premium feature upsell - adds ₹40,000/yr revenue stream";
            case "custom_reports" -> "Saves 10 hrs/week in manual reporting for client";
            case "auto_backup" -> "Zero data loss guarantee - essential for business continuity";
            case "biometric" -> "Enterprise security compliance - opens corporate client segment";
            case "email_marketing" -> "42x ROI - most cost-effective marketing channel";
            case "perf_audit" -> "53% users abandon slow sites - performance = revenue";
            default -> "Adds value for both client and service provider";
        };
    }
}
