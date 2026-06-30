package com.quoteflow.backend.service;

import com.quoteflow.backend.service.LocalFileStorageService.QuotationFileSet;
import com.quoteflow.backend.service.LocalFileStorageService.QuotationSummary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class LocalFileStorageServiceTest {

    private LocalFileStorageService service;

    @BeforeEach
    void setUp() throws Exception {
        Path reportsRoot = Paths.get("reports");
        if (Files.exists(reportsRoot)) {
            try (var walk = Files.walk(reportsRoot)) {
                walk.sorted(Comparator.reverseOrder())
                    .forEach(p -> { try { Files.deleteIfExists(p); } catch (Exception ignored) {} });
            }
        }
        service = new LocalFileStorageService();
        service.init();
    }

    @Test
    void testSaveQuotation_ReturnsFileSet() {
        Map<String, Object> quotationData = Map.of(
            "quoteNo", "Q-001",
            "projectName", "Test Project",
            "totalAmount", 50000
        );
        Map<String, Object> marketResearch = Map.of(
            "marketDemand", "HIGH",
            "complexity", "MODERATE"
        );
        List<Map<String, Object>> items = List.of(
            Map.of("name", "Web Dev", "price", 25000),
            Map.of("name", "Mobile App", "price", 25000)
        );

        QuotationFileSet result = service.saveQuotation(
            "WEBSITE", "Test Project", "Test Corp",
            "Q-001", quotationData, marketResearch, items
        );

        assertNotNull(result);
        assertEquals("Q-001", result.quoteNo());
        assertNotNull(result.folderPath());
        assertTrue(result.files().contains("quotation.json"));
        assertTrue(result.files().contains("items.json"));
        assertTrue(result.files().contains("market-research.json"));
        assertTrue(result.files().contains("metadata.json"));
    }

    @Test
    void testSaveQuotation_NullFieldsSanitized() {
        Map<String, Object> data = Map.of("test", "data");
        QuotationFileSet result = service.saveQuotation(
            null, null, null, "Q-002", data, Map.of(), List.of()
        );

        assertNotNull(result);
        assertEquals("Q-002", result.quoteNo());
    }

    @Test
    void testListAllQuotations_AfterSave() {
        Map<String, Object> data = Map.of("key", "value");
        service.saveQuotation("WEBSITE", "MySite", "ACME", "Q-LIST", data, Map.of(), List.of());

        List<QuotationSummary> summaries = service.listAllQuotations();
        assertFalse(summaries.isEmpty());

        QuotationSummary found = summaries.stream()
            .filter(s -> s.quoteNo().equals("Q-LIST"))
            .findFirst()
            .orElse(null);

        assertNotNull(found);
        assertEquals("WEBSITE", found.projectType());
        assertEquals("MySite", found.projectName());
        assertEquals("ACME", found.companyName());
    }

    @Test
    void testListAllQuotations_EmptyWhenNoSaves() {
        List<QuotationSummary> summaries = service.listAllQuotations();
        assertTrue(summaries.isEmpty());
    }

    @Test
    void testLoadQuotation_ReturnsFullData() {
        Map<String, Object> quotationData = new java.util.LinkedHashMap<>();
        quotationData.put("amount", 100000);
        quotationData.put("currency", "INR");
        Map<String, Object> research = Map.of("demand", "HIGH");
        List<Map<String, Object>> items = List.of(Map.of("name", "Item1", "qty", 1));
        Map<String, Object> costBreakdown = new java.util.LinkedHashMap<>();
        costBreakdown.put("total", 100000);
        costBreakdown.put("profit", 25000);
        quotationData.put("costBreakdown", costBreakdown);

        service.saveQuotation("ERP", "SchoolERP", "EduCorp", "Q-LOAD", quotationData, research, items);

        Map<String, Object> loaded = service.loadQuotation("Q-LOAD");
        assertNotNull(loaded);
        assertNotNull(loaded.get("quotation"));
        assertNotNull(loaded.get("marketResearch"));
        assertNotNull(loaded.get("costBreakdown"));
        assertNotNull(loaded.get("metadata"));
    }

    @Test
    void testLoadQuotation_NotFoundReturnsNull() {
        Map<String, Object> result = service.loadQuotation("NONEXISTENT");
        assertNull(result);
    }

    @Test
    void testGetQuotationFolderPath_ReturnsPath() {
        Map<String, Object> data = Map.of("key", "value");
        service.saveQuotation("MOBILE_APP", "FoodApp", "FoodCo", "Q-PATH", data, Map.of(), List.of());

        Path folderPath = service.getQuotationFolderPath("Q-PATH");
        assertNotNull(folderPath);
        assertTrue(folderPath.toString().contains("Q-PATH"));
    }

    @Test
    void testGetQuotationFolderPath_NotFoundReturnsNull() {
        Path result = service.getQuotationFolderPath("DOES_NOT_EXIST");
        assertNull(result);
    }

    @Test
    void testSaveQuotation_MultipleQuotations() {
        service.saveQuotation("WEBSITE", "SiteA", "CoA", "Q-M1", Map.of(), Map.of(), List.of());
        service.saveQuotation("WEBSITE", "SiteB", "CoB", "Q-M2", Map.of(), Map.of(), List.of());

        List<QuotationSummary> list = service.listAllQuotations();
        assertEquals(2, list.size());
    }

    @Test
    void testListAllQuotations_SortedByDateDesc() {
        service.saveQuotation("WEBSITE", "Older", "Co", "Q-OLD", Map.of(), Map.of(), List.of());
        service.saveQuotation("WEBSITE", "Newer", "Co", "Q-NEW", Map.of(), Map.of(), List.of());

        List<QuotationSummary> list = service.listAllQuotations();
        assertTrue(list.size() >= 2);
    }

    @Test
    void testSanitize_SpecialCharacters() {
        Map<String, Object> data = Map.of("key", "value");
        QuotationFileSet result = service.saveQuotation(
            "CUSTOM_SOFTWARE!!", "My @Project# $Name", "Client & Co.",
            "Q-SAN", data, Map.of(), List.of()
        );

        assertNotNull(result);
        assertFalse(result.folderPath().contains("!!"));
        assertFalse(result.folderPath().contains("@"));
    }

    @Test
    void testSaveQuotation_CostBreakdown() {
        Map<String, Object> breakdown = Map.of("total", 50000, "profit", 12500);
        Map<String, Object> data = Map.of("costBreakdown", breakdown);

        service.saveQuotation("WEBSITE", "Project", "Client", "Q-CB", data, Map.of(), List.of());

        Map<String, Object> loaded = service.loadQuotation("Q-CB");
        assertNotNull(loaded);
    }
}
