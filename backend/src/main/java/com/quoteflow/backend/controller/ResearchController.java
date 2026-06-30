package com.quoteflow.backend.controller;

import com.quoteflow.backend.service.SelfLearningService;
import com.quoteflow.backend.service.WebSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/research")
@RequiredArgsConstructor
public class ResearchController {

    private final WebSearchService webSearchService;
    private final SelfLearningService selfLearningService;

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchWeb(
            @RequestParam String query,
            @RequestParam(defaultValue = "CUSTOM") String category) {
        return ResponseEntity.ok(webSearchService.searchWeb(query, category));
    }

    @GetMapping("/market-pricing")
    public ResponseEntity<Map<String, Object>> getMarketPricing(
            @RequestParam String projectType,
            @RequestParam(defaultValue = "") String description) {
        return ResponseEntity.ok(webSearchService.getMarketPricing(projectType, description));
    }

    @PostMapping("/train")
    public ResponseEntity<Map<String, Object>> recordTraining(
            @RequestBody Map<String, Object> body) {
        webSearchService.recordTrainingData(
            (String) body.get("query"),
            (String) body.get("category"),
            body.get("results") instanceof List ? (List<Map<String, Object>>) body.get("results") : List.of(),
            Boolean.TRUE.equals(body.get("accurate"))
        );
        return ResponseEntity.ok(Map.of("status", "trained"));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getResearchStats() {
        return ResponseEntity.ok(webSearchService.getLearningStats());
    }

    @GetMapping("/knowledge")
    public ResponseEntity<Map<String, Object>> getKnowledgeBase() {
        return ResponseEntity.ok(webSearchService.getKnowledgeBase());
    }

    @GetMapping("/training")
    public ResponseEntity<List<Map<String, Object>>> getTrainingData() {
        return ResponseEntity.ok(webSearchService.getTrainingData());
    }

    @GetMapping("/learning/predict")
    public ResponseEntity<Map<String, Object>> predictPrice(
            @RequestParam String projectType,
            @RequestParam String description) {
        return ResponseEntity.ok(selfLearningService.predictPrice(projectType, description));
    }

    @PostMapping("/learning/learn")
    public ResponseEntity<Map<String, Object>> learnFromResult(
            @RequestBody Map<String, Object> body) {
        selfLearningService.learn(
            (String) body.get("projectType"),
            (String) body.get("description"),
            (int) body.getOrDefault("minPrice", 0),
            (int) body.getOrDefault("maxPrice", 0),
            Boolean.TRUE.equals(body.get("accurate"))
        );
        return ResponseEntity.ok(Map.of("status", "learned"));
    }

    @PostMapping("/learning/correct")
    public ResponseEntity<Map<String, Object>> correctPrediction(
            @RequestBody Map<String, Object> body) {
        selfLearningService.trainFromCorrection(
            (String) body.get("projectType"),
            (String) body.get("description"),
            (int) body.getOrDefault("correctMinPrice", 0),
            (int) body.getOrDefault("correctMaxPrice", 0)
        );
        return ResponseEntity.ok(Map.of("status", "corrected", "message", "Model retrained with correction"));
    }

    @GetMapping("/learning/stats")
    public ResponseEntity<Map<String, Object>> getLearningStats() {
        return ResponseEntity.ok(selfLearningService.getModelStats());
    }

    @GetMapping("/learning/patterns")
    public ResponseEntity<List<Map<String, Object>>> getPatterns() {
        return ResponseEntity.ok(selfLearningService.getPatterns());
    }

    @GetMapping("/learning/corrections")
    public ResponseEntity<List<Map<String, Object>>> getCorrections() {
        return ResponseEntity.ok(selfLearningService.getCorrections());
    }

    @DeleteMapping("/learning/reset")
    public ResponseEntity<Map<String, Object>> resetModel() {
        selfLearningService.resetModel();
        return ResponseEntity.ok(Map.of("status", "reset", "message", "Model reset successfully"));
    }
}
