package com.quoteflow.backend.service;

import com.quoteflow.backend.service.MarketResearchService.MarketPrice;
import com.quoteflow.backend.service.MarketResearchService.MarketResearchResult;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MarketResearchServiceTest {

    private MarketResearchService service;

    @BeforeEach
    void setUp() {
        service = new MarketResearchService();
    }

    @Test
    void testDetectProjectType_ErpKeywords() {
        MarketResearchResult result = service.research("erp system for school management", null);
        assertEquals("ERP", result.projectType());
        assertEquals("ERP System", result.projectDisplayName());
    }

    @Test
    void testDetectProjectType_MobileAppKeywords() {
        MarketResearchResult result = service.research("build an android app for food delivery", null);
        assertEquals("MOBILE_APP", result.projectType());
    }

    @Test
    void testDetectProjectType_WebsiteKeywords() {
        MarketResearchResult result = service.research("website for my business portfolio", null);
        assertEquals("WEBSITE", result.projectType());
    }

    @Test
    void testDetectProjectType_EcommerceKeywords() {
        MarketResearchResult result = service.research("ecommerce store with shopping cart", null);
        assertEquals("E_COMMERCE", result.projectType());
    }

    @Test
    void testDetectProjectType_FallbackToCustomSoftware() {
        MarketResearchResult result = service.research("some random text with no keywords", null);
        assertEquals("CUSTOM_SOFTWARE", result.projectType());
    }

    @Test
    void testDetectProjectType_ExplicitProjectTypeOverride() {
        MarketResearchResult result = service.research("random text", "ERP");
        assertEquals("ERP", result.projectType());
    }

    @Test
    void testDetectModules_ErpSchoolModules() {
        MarketResearchResult result = service.research("school erp with student management and fee tracking", "ERP");
        assertTrue(result.detectedModules().contains("Student Management"));
        assertTrue(result.detectedModules().contains("Fee Management"));
        assertTrue(result.detectedModules().contains("Dashboard & Analytics"));
    }

    @Test
    void testDetectModules_EmptyRequirementGetsDefaults() {
        MarketResearchResult result = service.research("something vague", null);
        assertFalse(result.detectedModules().isEmpty());
    }

    @Test
    void testPricingCalculation_RecommendedPrice() {
        MarketResearchResult result = service.research("website with contact form", "WEBSITE");
        int expectedBase = Math.max(result.marketMinPrice(), result.totalModuleCost());
        int totalProjectCost = expectedBase + result.infrastructureCost();
        int expectedRecommended = (int) (totalProjectCost * 1.25);
        assertEquals(expectedRecommended, result.recommendedPrice());
    }

    @Test
    void testPricingCalculation_MarketMinMax() {
        MarketResearchResult result = service.research("mobile app", "MOBILE_APP");
        assertTrue(result.marketMinPrice() > 0);
        assertTrue(result.marketMaxPrice() > result.marketMinPrice());
    }

    @Test
    void testInfrastructureCost_DomainHostingSsl() {
        MarketResearchResult result = service.research("domain hosting and ssl certificate", "WEBSITE");
        assertTrue(result.infrastructureCost() > 0);
    }

    @Test
    void testModulePrices_AllModulesHavePrices() {
        MarketResearchResult result = service.research("school management with student fee attendance exam hr payroll inventory", "ERP");
        for (MarketPrice mp : result.modulePrices()) {
            assertTrue(mp.price() > 0, "Module " + mp.name() + " should have a price > 0");
        }
    }

    @Test
    void testCompetitorPrices_ThreeTiers() {
        MarketResearchResult result = service.research("crm platform", "CRM");
        assertEquals(3, result.competitorPrices().size());
        assertEquals(result.marketMinPrice(), result.competitorPrices().get(0).price());
        assertEquals(result.marketMaxPrice(), result.competitorPrices().get(2).price());
    }

    @Test
    void testMarketInsights_ContainsAllKeys() {
        MarketResearchResult result = service.research("erp system", "ERP");
        assertTrue(result.marketInsights().containsKey("marketDemand"));
        assertTrue(result.marketInsights().containsKey("complexity"));
        assertTrue(result.marketInsights().containsKey("timelineEstimate"));
        assertTrue(result.marketInsights().containsKey("skillAvailability"));
    }

    @Test
    void testCompetitivePrice() {
        MarketResearchResult result = service.research("website", "WEBSITE");
        int expectedCompetitive = result.marketMinPrice() + (result.marketMaxPrice() - result.marketMinPrice()) / 3;
        assertEquals(expectedCompetitive, result.competitivePrice());
    }
}
