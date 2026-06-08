package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.ApprovalWorkflow;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping("/pending")
    public ResponseEntity<List<ApprovalWorkflow>> getPendingApprovals(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(approvalService.getApprovalsByUser(user.getId()));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApprovalWorkflow> submitForApproval(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        UUID quotationId = UUID.fromString((String) body.get("quotationId"));
        return ResponseEntity.ok(approvalService.submitForApproval(quotationId, user.getId()));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApprovalWorkflow> approve(@PathVariable UUID id, @AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(approvalService.approve(id, user.getId(), (String) body.get("comments")));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApprovalWorkflow> reject(@PathVariable UUID id, @AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(approvalService.reject(id, user.getId(), (String) body.get("comments")));
    }

    @GetMapping("/quotation/{quotationId}")
    public ResponseEntity<List<ApprovalWorkflow>> getQuotationApprovals(@PathVariable UUID quotationId) {
        return ResponseEntity.ok(approvalService.getApprovalsByQuotation(quotationId));
    }
}
