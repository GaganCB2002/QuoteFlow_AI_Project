package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Campaign;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(campaignService.getCompanyCampaigns(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaign(@PathVariable UUID id) {
        return ResponseEntity.ok(campaignService.getCampaignById(id));
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Campaign created = campaignService.createCampaign(
                user.getCompany().getId(),
                user.getId(),
                (String) body.get("name"),
                (String) body.get("type"),
                (String) body.get("content"),
                body.get("scheduledAt") != null ? LocalDateTime.parse((String) body.get("scheduledAt")) : null
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        Campaign updated = campaignService.updateCampaign(
                id,
                (String) body.get("name"),
                (String) body.get("content"),
                (String) body.get("status")
        );
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable UUID id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/schedule")
    public ResponseEntity<Campaign> scheduleCampaign(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        LocalDateTime scheduledAt = LocalDateTime.parse((String) body.get("scheduledAt"));
        return ResponseEntity.ok(campaignService.scheduleCampaign(id, scheduledAt));
    }

    @PostMapping("/{id}/send")
    public ResponseEntity<Campaign> sendCampaign(@PathVariable UUID id) {
        return ResponseEntity.ok(campaignService.sendCampaign(id));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics(@AuthenticationPrincipal User user) {
        List<Campaign> campaigns = campaignService.getCompanyCampaigns(user.getCompany().getId());
        long total = campaigns.size();
        long sent = campaigns.stream().filter(c -> "SENT".equals(c.getStatus())).count();
        long scheduled = campaigns.stream().filter(c -> "SCHEDULED".equals(c.getStatus())).count();
        long draft = campaigns.stream().filter(c -> "DRAFT".equals(c.getStatus())).count();

        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("total", total);
        analytics.put("sent", sent);
        analytics.put("scheduled", scheduled);
        analytics.put("draft", draft);
        return ResponseEntity.ok(analytics);
    }
}
