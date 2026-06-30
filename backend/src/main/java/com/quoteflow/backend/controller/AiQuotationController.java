package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.AiAnalysisResult;
import com.quoteflow.backend.dto.AiQuotationRequest;
import com.quoteflow.backend.dto.QuotationDto;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiQuotationController {

    private final AiService aiService;

    @PostMapping("/analyze")
    public ResponseEntity<AiAnalysisResult> analyzeRequirements(
            @RequestBody AiQuotationRequest request) {
        AiAnalysisResult result = aiService.analyzeRequirements(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/generate-quotation")
    public ResponseEntity<?> generateQuotation(
            @RequestBody AiQuotationRequest request,
            @AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }
        QuotationDto saved = aiService.generateAndSaveQuotation(request, user);
        return ResponseEntity.ok(saved);
    }
}
