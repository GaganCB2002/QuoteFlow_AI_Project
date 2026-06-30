package com.quoteflow.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class SelfLearningServiceTest {

    private SelfLearningService service;

    @BeforeEach
    void setUp() {
        service = new SelfLearningService();
    }

    @Test
    void testPredictPrice_NoPattern_ReturnsNotPredicted() {
        Map<String, Object> result = service.predictPrice("WEBSITE", "unknown project description");
        assertFalse((Boolean) result.get("predicted"));
        assertEquals("0%", result.get("confidence"));
    }

    @Test
    void testLearn_StoresPattern() {
        service.learn("WEBSITE", "business website", 30000, 150000, true);

        Map<String, Object> result = service.predictPrice("WEBSITE", "business website");
        assertTrue((Boolean) result.get("predicted"));
        assertTrue((Boolean) result.get("fromPattern"));
        assertEquals(30000, result.get("minPrice"));
        assertEquals(150000, result.get("maxPrice"));
    }

    @Test
    void testLearn_UpdatesExistingPattern() {
        service.learn("WEBSITE", "business website", 30000, 150000, true);
        service.learn("WEBSITE", "business website", 40000, 160000, true);

        Map<String, Object> result = service.predictPrice("WEBSITE", "business website");
        assertEquals(35000, result.get("minPrice"));
        assertEquals(155000, result.get("maxPrice"));
    }

    @Test
    void testLearn_InaccurateAddsCorrection() {
        service.learn("ERP", "school erp", 80000, 200000, false);

        Map<String, Object> stats = service.getModelStats();
        assertTrue(((Number) stats.get("totalCorrections")).longValue() > 0);
    }

    @Test
    void testTrainFromCorrection_OverridesPattern() {
        service.trainFromCorrection("MOBILE_APP", "food delivery app", 50000, 200000);

        Map<String, Object> result = service.predictPrice("MOBILE_APP", "food delivery app");
        assertTrue((Boolean) result.get("predicted"));
        assertEquals(50000, result.get("minPrice"));
        assertEquals(200000, result.get("maxPrice"));
    }

    @Test
    void testGetModelStats_InitialState() {
        Map<String, Object> stats = service.getModelStats();
        assertNotNull(stats);
        assertEquals(0, ((Number) stats.get("totalPatterns")).intValue());
        assertEquals(0L, ((Number) stats.get("totalPredictions")).longValue());
        assertEquals(0L, ((Number) stats.get("accuratePredictions")).longValue());
        assertEquals("0%", stats.get("accuracyRate"));
        assertEquals(0, ((Number) stats.get("totalCorrections")).intValue());
        assertEquals("v2.0", stats.get("modelVersion"));
    }

    @Test
    void testGetModelStats_AfterTraining() {
        service.learn("WEBSITE", "business site", 30000, 100000, true);
        service.learn("MOBILE_APP", "mobile app", 50000, 200000, true);
        service.predictPrice("ERP", "unknown");

        Map<String, Object> stats = service.getModelStats();
        assertEquals(2, ((Number) stats.get("totalPatterns")).intValue());
        assertEquals(1L, ((Number) stats.get("totalPredictions")).longValue());
        assertEquals(0L, ((Number) stats.get("accuratePredictions")).longValue());
    }

    @Test
    void testFindSimilarPattern() {
        service.learn("WEBSITE", "business website with contact form and blog", 30000, 100000, true);

        Map<String, Object> result = service.predictPrice("WEBSITE", "website with contact form");
        assertTrue((Boolean) result.get("predicted"));
        assertEquals("partial", result.get("similarity"));
    }

    @Test
    void testResetModel_ClearsAll() {
        service.learn("WEBSITE", "test site", 10000, 50000, true);
        service.resetModel();

        Map<String, Object> stats = service.getModelStats();
        assertEquals(0, ((Number) stats.get("totalPatterns")).intValue());
        assertEquals(0L, ((Number) stats.get("totalPredictions")).longValue());
        assertEquals(0L, ((Number) stats.get("accuratePredictions")).longValue());
    }

    @Test
    void testGetPatterns_ReturnsLearnedData() {
        service.learn("WEBSITE", "my website", 20000, 80000, true);
        var patterns = service.getPatterns();
        assertFalse(patterns.isEmpty());
        assertEquals("WEBSITE", patterns.get(0).get("projectType"));
    }

    @Test
    void testGetCorrections_ReturnsCorrectedData() {
        service.learn("WEBSITE", "bad estimate", 10000, 50000, false);
        var corrections = service.getCorrections();
        assertFalse(corrections.isEmpty());
        assertNotNull(corrections.get(0).get("correctMinPrice"));
    }

    @Test
    void testPredictPrice_PartialMatchIncreasesAccuracy() {
        service.learn("ERP", "school management erp fee attendance exam", 80000, 300000, true);

        Map<String, Object> exact = service.predictPrice("ERP", "school management erp fee attendance exam");
        assertTrue((Boolean) exact.get("predicted"));

        Map<String, Object> stats = service.getModelStats();
        assertTrue(((Number) stats.get("accuratePredictions")).longValue() >= 1);
    }
}
