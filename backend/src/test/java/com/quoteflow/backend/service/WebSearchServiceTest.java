package com.quoteflow.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class WebSearchServiceTest {

    private WebSearchService service;

    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        service = new WebSearchService();
    }

    @Test
    void testSearchWeb_ReturnsFallbackResults() {
        List<Map<String, Object>> results = service.searchWeb("website development", "WEBSITE");
        assertNotNull(results);
        assertFalse(results.isEmpty());
    }

    @Test
    void testSearchWeb_CachesResults() {
        List<Map<String, Object>> first = service.searchWeb("mobile app cost", "MOBILE_APP");
        List<Map<String, Object>> second = service.searchWeb("mobile app cost", "MOBILE_APP");
        assertNotNull(second);
        assertEquals(first.size(), second.size());
    }

    @Test
    void testSearchWeb_DifferentQueryDifferentCache() {
        List<Map<String, Object>> first = service.searchWeb("erp system", "ERP");
        List<Map<String, Object>> second = service.searchWeb("website design", "WEBSITE");
        assertNotNull(first);
        assertNotNull(second);
    }

    @Test
    void testGetMarketPricing_ReturnsStructure() {
        Map<String, Object> result = service.getMarketPricing("WEBSITE", "business website development");
        assertNotNull(result);
        assertEquals("WEBSITE", result.get("projectType"));
        assertNotNull(result.get("results"));
        assertTrue(result.containsKey("marketMinPrice"));
        assertTrue(result.containsKey("marketMaxPrice"));
        assertTrue(result.containsKey("estimatedMidPrice"));
    }

    @Test
    void testAddToKnowledgeBase_StoresEntries() {
        List<Map<String, Object>> entries = List.of(
            Map.of("name", "Test Service", "description", "A test entry", "minPrice", 10000, "maxPrice", 50000, "category", "TEST")
        );
        service.addToKnowledgeBase("TEST", entries);

        List<Map<String, Object>> found = service.searchWeb("test service", "TEST");
        assertFalse(found.isEmpty());
    }

    @Test
    void testAddToKnowledgeBase_DeduplicatesByName() {
        List<Map<String, Object>> entry = List.of(
            Map.of("name", "Dup Service", "description", "Original", "minPrice", 10000, "maxPrice", 50000, "category", "DUP")
        );
        service.addToKnowledgeBase("DUP", entry);
        service.addToKnowledgeBase("DUP", entry);

        Map<String, Object> kb = service.getKnowledgeBase();
        List<Map<String, Object>> entries = (List<Map<String, Object>>) kb.get("DUP");
        assertEquals(1, entries.size());
    }

    @Test
    void testRecordTrainingData_AccurateAddsToKnowledgeBase() {
        List<Map<String, Object>> results = List.of(
            Map.of("name", "Trained Service", "description", "From training", "minPrice", 20000, "maxPrice", 60000, "category", "TRAIN")
        );
        service.recordTrainingData("trained service", "TRAIN", results, true);

        List<Map<String, Object>> found = service.searchWeb("trained service", "TRAIN");
        assertFalse(found.isEmpty());
    }

    @Test
    void testRecordTrainingData_InaccurateDoesNotAdd() {
        List<Map<String, Object>> results = List.of(
            Map.of("name", "Bad Entry", "description", "Should not be added", "minPrice", 0, "maxPrice", 0, "category", "BAD")
        );
        service.recordTrainingData("bad", "BAD", results, false);

        List<Map<String, Object>> found = service.searchWeb("nonexistent", "BAD");
        assertTrue(found.isEmpty() || found.stream().noneMatch(e -> "Bad Entry".equals(e.get("name"))));
    }

    @Test
    void testGetLearningStats_ReturnsAllKeys() {
        Map<String, Object> stats = service.getLearningStats();
        assertNotNull(stats);
        assertTrue(stats.containsKey("totalSearches"));
        assertTrue(stats.containsKey("totalKnowledgeEntries"));
        assertTrue(stats.containsKey("totalTrainingRecords"));
        assertTrue(stats.containsKey("accuracyRate"));
        assertTrue(stats.containsKey("categories"));
        assertTrue(stats.containsKey("cacheSize"));
    }

    @Test
    void testGetTrainingData_ReturnsList() {
        List<Map<String, Object>> data = service.getTrainingData();
        assertNotNull(data);
    }

    @Test
    void testGetKnowledgeBase_ReturnsMap() {
        Map<String, Object> kb = service.getKnowledgeBase();
        assertNotNull(kb);
    }

    @Test
    void testFallbackResults_CoversAllCategories() {
        List<Map<String, Object>> website = service.searchWeb("website", "WEBSITE");
        assertFalse(website.isEmpty());

        List<Map<String, Object>> mobile = service.searchWeb("mobile", "MOBILE_APP");
        assertFalse(mobile.isEmpty());

        List<Map<String, Object>> erp = service.searchWeb("erp school", "ERP");
        assertFalse(erp.isEmpty());

        List<Map<String, Object>> ecom = service.searchWeb("ecommerce", "E_COMMERCE");
        assertFalse(ecom.isEmpty());

        List<Map<String, Object>> crm = service.searchWeb("crm", "CRM");
        assertFalse(crm.isEmpty());
    }
}
