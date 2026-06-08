package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.CostTemplate;
import com.quoteflow.backend.entity.CostTemplateItem;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.EstimationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/estimation")
@RequiredArgsConstructor
public class EstimationController {

    private final EstimationService estimationService;

    @GetMapping("/templates")
    public ResponseEntity<List<CostTemplate>> getTemplates(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(estimationService.getAllTemplates(user.getCompany().getId()));
    }

    @PostMapping("/templates")
    public ResponseEntity<CostTemplate> createTemplate(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(estimationService.createTemplate(
                user.getCompany().getId(),
                (String) body.get("name"),
                (String) body.get("description"),
                body.get("items") != null ? (List<Map<String, Object>>) body.get("items") : null
        ));
    }

    @GetMapping("/templates/{id}")
    public ResponseEntity<List<CostTemplateItem>> getTemplateItems(@PathVariable UUID id) {
        return ResponseEntity.ok(estimationService.getTemplateItems(id));
    }

    @PostMapping("/templates/{id}/items")
    public ResponseEntity<List<CostTemplateItem>> addTemplateItem(@PathVariable UUID id, @RequestBody List<Map<String, Object>> items) {
        List<CostTemplateItem> saved = estimationService.addTemplateItems(id, items);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/params/{projectType}")
    public ResponseEntity<Map<String, Object>> getProjectParams(@PathVariable String projectType) {
        return ResponseEntity.ok(estimationService.getProjectParams(projectType));
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeRequirement(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        return ResponseEntity.ok(estimationService.analyzeRequirement(text));
    }

    @PostMapping("/estimate")
    public ResponseEntity<Map<String, Object>> estimateProject(@RequestBody Map<String, Object> params) {
        String projectType = (String) params.getOrDefault("projectType", "CUSTOM_SOFTWARE");
        return ResponseEntity.ok(estimationService.estimateProject(projectType, params));
    }

    @PostMapping("/validate-price")
    public ResponseEntity<Map<String, Object>> validatePrice(@RequestBody Map<String, Object> body) {
        BigDecimal actualCost = new BigDecimal(body.get("actualCost").toString());
        BigDecimal quoteAmount = new BigDecimal(body.get("quoteAmount").toString());
        BigDecimal minProfit = body.get("minProfit") != null
                ? new BigDecimal(body.get("minProfit").toString())
                : BigDecimal.ZERO;
        return ResponseEntity.ok(estimationService.checkUnderquoting(actualCost, quoteAmount, minProfit));
    }

    @PostMapping("/generate-proposal")
    public ResponseEntity<Map<String, Object>> generateProposal(@RequestBody Map<String, Object> body) {
        String projectType = (String) body.getOrDefault("projectType", "CUSTOM_SOFTWARE");
        String clientName = (String) body.getOrDefault("clientName", "Client");
        Map<String, Object> estimation = (Map<String, Object>) body.get("estimation");
        return ResponseEntity.ok(estimationService.generateProposal(projectType, estimation, clientName));
    }

    @GetMapping("/deliverables/{projectType}")
    public ResponseEntity<List<Map<String, String>>> getDeliverables(@PathVariable String projectType) {
        return ResponseEntity.ok(estimationService.generateDeliverables(projectType));
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getProjectTypes() {
        return ResponseEntity.ok(estimationService.getProjectParams("WEBSITE").containsKey("availableTypes")
                ? (List<String>) estimationService.getProjectParams("WEBSITE").get("availableTypes")
                : List.of());
    }
}