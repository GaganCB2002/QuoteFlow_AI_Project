package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.LandingLeadDto;
import com.quoteflow.backend.service.LandingLeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class LandingLeadController {

    private final LandingLeadService landingLeadService;

    @PostMapping("/api/public/leads")
    public ResponseEntity<LandingLeadDto> submitLead(@RequestBody LandingLeadDto dto) {
        LandingLeadDto saved = landingLeadService.submitLead(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/api/landing-leads")
    public ResponseEntity<List<LandingLeadDto>> getAllLeads() {
        return ResponseEntity.ok(landingLeadService.getAllLeads());
    }

    @PutMapping("/api/landing-leads/{id}/contacted")
    public ResponseEntity<LandingLeadDto> markContacted(@PathVariable UUID id) {
        return ResponseEntity.ok(landingLeadService.markContacted(id));
    }

    @GetMapping("/api/landing-leads/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(landingLeadService.getStats());
    }
}
