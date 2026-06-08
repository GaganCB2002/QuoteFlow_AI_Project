package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Lead;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(leadService.getCompanyLeads(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lead> getLead(@PathVariable UUID id) {
        return ResponseEntity.ok(leadService.getLeadById(id));
    }

    @PostMapping
    public ResponseEntity<Lead> createLead(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Lead created = leadService.createLead(
                user.getCompany().getId(),
                body.get("customerId") != null ? UUID.fromString((String) body.get("customerId")) : null,
                (String) body.get("source"),
                (String) body.get("notes")
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lead> updateLead(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        Lead lead = leadService.getLeadById(id);
        if (body.containsKey("source")) lead.setSource((String) body.get("source"));
        if (body.containsKey("notes")) lead.setNotes((String) body.get("notes"));
        return ResponseEntity.ok(lead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable UUID id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<Lead> assignLead(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        UUID userId = UUID.fromString((String) body.get("userId"));
        return ResponseEntity.ok(leadService.assignToUser(id, userId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Lead> updateLeadStatus(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(leadService.updateLeadStatus(id, (String) body.get("status")));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Lead>> getMyLeads(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(leadService.getLeadsByAssignedUser(user.getCompany().getId(), user.getId()));
    }
}
