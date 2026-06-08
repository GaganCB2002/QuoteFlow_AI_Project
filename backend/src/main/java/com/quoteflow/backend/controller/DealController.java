package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Deal;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/deals")
@RequiredArgsConstructor
public class DealController {

    private final DealService dealService;

    @GetMapping
    public ResponseEntity<List<Deal>> getAllDeals(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dealService.getCompanyDeals(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDeal(@PathVariable UUID id) {
        return ResponseEntity.ok(dealService.getDealById(id));
    }

    @PostMapping
    public ResponseEntity<Deal> createDeal(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Deal created = dealService.createDeal(
                user.getCompany().getId(),
                (String) body.get("name"),
                body.get("amount") != null ? new BigDecimal(body.get("amount").toString()) : null,
                body.get("probability") != null ? (Integer) body.get("probability") : null,
                body.get("expectedCloseDate") != null ? LocalDate.parse((String) body.get("expectedCloseDate")) : null,
                body.get("leadId") != null ? UUID.fromString((String) body.get("leadId")) : null,
                body.get("customerId") != null ? UUID.fromString((String) body.get("customerId")) : null,
                body.get("assignedToId") != null ? UUID.fromString((String) body.get("assignedToId")) : null,
                (String) body.get("notes")
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        Deal updated = dealService.updateDeal(
                id,
                (String) body.get("name"),
                body.get("amount") != null ? new BigDecimal(body.get("amount").toString()) : null,
                body.get("probability") != null ? (Integer) body.get("probability") : null,
                body.get("expectedCloseDate") != null ? LocalDate.parse((String) body.get("expectedCloseDate")) : null,
                (String) body.get("notes")
        );
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable UUID id) {
        dealService.deleteDeal(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/stage")
    public ResponseEntity<Deal> moveStage(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(dealService.moveStage(id, (String) body.get("stage")));
    }

    @GetMapping("/pipeline")
    public ResponseEntity<Map<String, List<Deal>>> getPipeline(@AuthenticationPrincipal User user) {
        List<Deal> deals = dealService.getCompanyDeals(user.getCompany().getId());
        Map<String, List<Deal>> pipeline = deals.stream()
                .collect(Collectors.groupingBy(Deal::getStage, LinkedHashMap::new, Collectors.toList()));
        return ResponseEntity.ok(pipeline);
    }

    @GetMapping("/stage/{stage}")
    public ResponseEntity<List<Deal>> getDealsByStage(@AuthenticationPrincipal User user, @PathVariable String stage) {
        return ResponseEntity.ok(dealService.getDealsByStage(user.getCompany().getId(), stage));
    }
}
