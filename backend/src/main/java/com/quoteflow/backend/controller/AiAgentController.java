package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.AiAgentResponse;
import com.quoteflow.backend.dto.AiQuotationRequest;
import com.quoteflow.backend.service.AiAgentService;
import com.quoteflow.backend.service.FeatureSuggesterService;
import com.quoteflow.backend.service.LocalFileStorageService;
import com.quoteflow.backend.service.QuotationEditorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
public class AiAgentController {

    private final AiAgentService aiAgentService;
    private final LocalFileStorageService fileStorageService;
    private final QuotationEditorService quotationEditorService;
    private final FeatureSuggesterService featureSuggesterService;

    @PostMapping("/analyze")
    public ResponseEntity<AiAgentResponse> analyze(@RequestBody AiQuotationRequest request) {
        AiAgentResponse response = aiAgentService.processRequirement(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<LocalFileStorageService.QuotationSummary>> getHistory() {
        return ResponseEntity.ok(aiAgentService.getHistory());
    }

    @GetMapping("/quotations/{quoteNo}")
    public ResponseEntity<Map<String, Object>> getQuotation(@PathVariable String quoteNo) {
        Map<String, Object> data = aiAgentService.loadQuotation(quoteNo);
        if (data == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(data);
    }

    @PutMapping("/quotations/{quoteNo}/items")
    public ResponseEntity<Map<String, Object>> editItems(
            @PathVariable String quoteNo, @RequestBody List<Map<String, Object>> items) {
        return ResponseEntity.ok(quotationEditorService.editLineItems(quoteNo, items));
    }

    @PostMapping("/quotations/{quoteNo}/features")
    public ResponseEntity<Map<String, Object>> addFeature(
            @PathVariable String quoteNo, @RequestBody Map<String, Object> feature) {
        return ResponseEntity.ok(quotationEditorService.addFeature(quoteNo, feature));
    }

    @DeleteMapping("/quotations/{quoteNo}/features/{itemName}")
    public ResponseEntity<Map<String, Object>> removeFeature(
            @PathVariable String quoteNo, @PathVariable String itemName) {
        return ResponseEntity.ok(quotationEditorService.removeFeature(quoteNo, itemName));
    }

    @PutMapping("/quotations/{quoteNo}/items/{itemName}/price")
    public ResponseEntity<Map<String, Object>> overridePrice(
            @PathVariable String quoteNo, @PathVariable String itemName,
            @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(quotationEditorService.overridePrice(quoteNo, itemName, body.get("price")));
    }

    @PutMapping("/quotations/{quoteNo}/tier")
    public ResponseEntity<Map<String, Object>> applyTier(
            @PathVariable String quoteNo, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(quotationEditorService.updateTier(quoteNo, body.get("tier")));
    }

    @GetMapping("/suggestions")
    public ResponseEntity<FeatureSuggesterService.FeatureSuggestionResult> getSuggestions(
            @RequestParam String projectType,
            @RequestParam(defaultValue = "") String description,
            @RequestParam(defaultValue = "100000") int budget) {
        return ResponseEntity.ok(aiAgentService.getSuggestions(projectType, description, budget));
    }

    @GetMapping("/quotations/{quoteNo}/download")
    public ResponseEntity<byte[]> downloadQuotation(@PathVariable String quoteNo) {
        Path folderPath = fileStorageService.getQuotationFolderPath(quoteNo);
        if (folderPath == null) return ResponseEntity.notFound().build();
        try {
            Path quotationFile = folderPath.resolve("quotation.json");
            if (!Files.exists(quotationFile)) return ResponseEntity.notFound().build();
            byte[] content = Files.readAllBytes(quotationFile);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setContentDispositionFormData("attachment", quoteNo + "-quotation.json");
            return ResponseEntity.ok().headers(headers).body(content);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/quotations/{quoteNo}/download/all")
    public ResponseEntity<byte[]> downloadAllFiles(@PathVariable String quoteNo) {
        Path folderPath = fileStorageService.getQuotationFolderPath(quoteNo);
        if (folderPath == null) return ResponseEntity.notFound().build();
        try {
            Map<String, Object> allData = aiAgentService.loadQuotation(quoteNo);
            if (allData == null) return ResponseEntity.notFound().build();
            byte[] content = new com.fasterxml.jackson.databind.ObjectMapper()
                .writerWithDefaultPrettyPrinter().writeValueAsBytes(allData);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setContentDispositionFormData("attachment", quoteNo + "-complete-quotation.json");
            return ResponseEntity.ok().headers(headers).body(content);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/quotations/{quoteNo}/folder-path")
    public ResponseEntity<Map<String, String>> getFolderPath(@PathVariable String quoteNo) {
        Path path = fileStorageService.getQuotationFolderPath(quoteNo);
        if (path == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of(
            "quoteNo", quoteNo, "folderPath", path.toAbsolutePath().toString(),
            "exists", String.valueOf(Files.exists(path))));
    }
}
