package com.quoteflow.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuotationEditorService {

    private final LocalFileStorageService fileStorageService;
    private final ObjectMapper objectMapper;

    public Map<String, Object> editLineItems(String quoteNo, List<Map<String, Object>> updatedItems) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        Map<String, Object> quotation = (Map<String, Object>) existing.getOrDefault("quotation", new HashMap<>());

        int subtotal = 0;
        for (Map<String, Object> item : updatedItems) {
            int qty = ((Number) item.getOrDefault("quantity", 1)).intValue();
            int price = ((Number) item.getOrDefault("unitPrice", 0)).intValue();
            int total = qty * price;
            item.put("total", total);
            subtotal += total;
        }

        int gst = (int) Math.round(subtotal * 0.18);
        int grandTotal = subtotal + gst;

        quotation.put("lineItems", updatedItems);

        Map<String, Object> costSummary = (Map<String, Object>) quotation.getOrDefault("costSummary", new HashMap<>());
        costSummary.put("totalModuleCost", subtotal);
        costSummary.put("subtotal", subtotal);
        costSummary.put("gstAmount", gst);
        costSummary.put("grandTotal", grandTotal);
        quotation.put("costSummary", costSummary);

        existing.put("quotation", quotation);
        existing.put("items", updatedItems);

        Path folderPath = fileStorageService.getQuotationFolderPath(quoteNo);
        if (folderPath != null) {
            try {
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(
                    folderPath.resolve("quotation.json").toFile(), quotation);
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(
                    folderPath.resolve("items.json").toFile(), updatedItems);
            } catch (Exception e) {
                throw new RuntimeException("Failed to save edited quotation", e);
            }
        }

        return existing;
    }

    public Map<String, Object> addFeature(String quoteNo, Map<String, Object> feature) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        List<Map<String, Object>> items = (List<Map<String, Object>>) existing.getOrDefault("items", new ArrayList<>());

        Map<String, Object> newItem = new LinkedHashMap<>();
        newItem.put("itemName", feature.getOrDefault("name", "Custom Feature"));
        newItem.put("description", feature.getOrDefault("description", ""));
        newItem.put("quantity", 1);
        newItem.put("unitPrice", feature.getOrDefault("price", 0));
        newItem.put("total", ((Number) feature.getOrDefault("price", 0)).intValue());
        newItem.put("hsn", "9983");
        newItem.put("addedBy", "admin");
        newItem.put("isAddOn", true);
        items.add(newItem);

        return editLineItems(quoteNo, items);
    }

    public Map<String, Object> removeFeature(String quoteNo, String itemName) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        List<Map<String, Object>> items = (List<Map<String, Object>>) existing.getOrDefault("items", new ArrayList<>());
        List<Map<String, Object>> updated = items.stream()
            .filter(i -> !itemName.equals(i.get("itemName")))
            .collect(Collectors.toList());

        return editLineItems(quoteNo, updated);
    }

    public Map<String, Object> overridePrice(String quoteNo, String itemName, int newPrice) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        List<Map<String, Object>> items = (List<Map<String, Object>>) existing.getOrDefault("items", new ArrayList<>());
        for (Map<String, Object> item : items) {
            if (itemName.equals(item.get("itemName"))) {
                item.put("unitPrice", newPrice);
                item.put("total", ((Number) item.getOrDefault("quantity", 1)).intValue() * newPrice);
                item.put("priceOverridden", true);
                break;
            }
        }

        return editLineItems(quoteNo, items);
    }

    public Map<String, Object> updateTier(String quoteNo, String tierName) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        Map<String, Object> quotation = (Map<String, Object>) existing.getOrDefault("quotation", new HashMap<>());
        quotation.put("selectedTier", tierName);
        existing.put("quotation", quotation);

        Path folderPath = fileStorageService.getQuotationFolderPath(quoteNo);
        if (folderPath != null) {
            try {
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(
                    folderPath.resolve("quotation.json").toFile(), quotation);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update tier", e);
            }
        }

        return existing;
    }

    public Map<String, Object> applyTierPricing(String quoteNo, PricingTierService.PricingTier tier) {
        Map<String, Object> existing = fileStorageService.loadQuotation(quoteNo);
        if (existing == null) throw new RuntimeException("Quotation not found: " + quoteNo);

        List<Map<String, Object>> items = (List<Map<String, Object>>) existing.getOrDefault("items", new ArrayList<>());

        BigDecimal costPrice = BigDecimal.valueOf(tier.totalCost());
        BigDecimal multiplier = BigDecimal.valueOf(1.0 + tier.marginPct() / 100.0);

        for (Map<String, Object> item : items) {
            int originalPrice = ((Number) item.getOrDefault("unitPrice", 0)).intValue();
            if (!item.containsKey("priceOverridden") || !(boolean) item.get("priceOverridden")) {
                BigDecimal adjustedPrice = BigDecimal.valueOf(originalPrice).multiply(multiplier)
                    .setScale(0, RoundingMode.HALF_UP);
                item.put("unitPrice", adjustedPrice.intValue());
                item.put("total", adjustedPrice.intValue() * ((Number) item.getOrDefault("quantity", 1)).intValue());
            }
        }

        Map<String, Object> quotation = (Map<String, Object>) existing.getOrDefault("quotation", new HashMap<>());
        quotation.put("selectedTier", tier.name());
        quotation.put("tierMargin", tier.marginPct());
        existing.put("quotation", quotation);
        existing.put("items", items);

        Path folderPath = fileStorageService.getQuotationFolderPath(quoteNo);
        if (folderPath != null) {
            try {
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(
                    folderPath.resolve("quotation.json").toFile(), quotation);
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(
                    folderPath.resolve("items.json").toFile(), items);
            } catch (Exception e) {
                throw new RuntimeException("Failed to apply tier pricing", e);
            }
        }

        return existing;
    }
}
