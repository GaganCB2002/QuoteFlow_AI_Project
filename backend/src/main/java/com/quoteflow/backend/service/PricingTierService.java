package com.quoteflow.backend.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class PricingTierService {

    private static final double BASIC_MARGIN = 0.15;
    private static final double STANDARD_MARGIN = 0.25;
    private static final double PREMIUM_MARGIN = 0.40;
    private static final double GST_RATE = 0.18;

    public record PricingTier(
        String name, String description, double marginPct,
        int totalCost, int profit, int priceBeforeGst,
        int gstAmount, int grandTotal,
        int customerSavings, String targetCustomer,
        int adminRevenuePerSale
    ) {}

    public record TieredPricingResult(
        PricingTier basic,
        PricingTier standard,
        PricingTier premium,
        int costPrice,
        String recommendation
    ) {
        public PricingTier getRecommended() { return standard; }
    }

    public TieredPricingResult calculateTiers(int totalCostPrice) {
        BigDecimal cost = BigDecimal.valueOf(totalCostPrice);

        // Basic Tier - Low margin, high volume (15%)
        PricingTier basic = buildTier("Basic", "Best value for budget-conscious clients", BASIC_MARGIN, cost);

        // Standard Tier - Balanced margin (25%) - Recommended
        PricingTier standard = buildTier("Standard", "Balanced pricing with optimal features", STANDARD_MARGIN, cost);

        // Premium Tier - High margin, premium service (40%)
        PricingTier premium = buildTier("Premium", "Enterprise-grade with full support", PREMIUM_MARGIN, cost);

        String recommendation;
        if (totalCostPrice < 50000) {
            recommendation = "Basic tier recommended for small budgets";
        } else if (totalCostPrice < 200000) {
            recommendation = "Standard tier offers best value for mid-range projects";
        } else {
            recommendation = "Premium tier maximizes revenue for enterprise projects";
        }

        return new TieredPricingResult(basic, standard, premium, totalCostPrice, recommendation);
    }

    private PricingTier buildTier(String name, String desc, double margin, BigDecimal cost) {
        BigDecimal profit = cost.multiply(BigDecimal.valueOf(margin)).setScale(0, RoundingMode.HALF_UP);
        BigDecimal beforeGst = cost.add(profit);
        BigDecimal gst = beforeGst.multiply(BigDecimal.valueOf(GST_RATE)).setScale(0, RoundingMode.HALF_UP);
        BigDecimal grandTotal = beforeGst.add(gst);

        int customerSavings;
        if ("Basic".equals(name)) {
            BigDecimal standardPrice = cost.add(cost.multiply(BigDecimal.valueOf(STANDARD_MARGIN))).add(
                cost.add(cost.multiply(BigDecimal.valueOf(STANDARD_MARGIN)))
                    .multiply(BigDecimal.valueOf(GST_RATE))
            ).setScale(0, RoundingMode.HALF_UP);
            customerSavings = standardPrice.subtract(grandTotal).intValue();
        } else if ("Premium".equals(name)) {
            customerSavings = 0;
        } else {
            customerSavings = 0;
        }

        String target = switch (name) {
            case "Basic" -> "Startups & small businesses";
            case "Standard" -> "Growing businesses & mid-market";
            case "Premium" -> "Enterprises & large organizations";
            default -> "General";
        };

        return new PricingTier(
            name, desc, margin * 100,
            cost.intValue(), profit.intValue(),
            beforeGst.intValue(), gst.intValue(), grandTotal.intValue(),
            customerSavings, target, profit.intValue()
        );
    }
}
