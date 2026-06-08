package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.VisitorTrackingDto;
import com.quoteflow.backend.service.VisitorTrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class VisitorTrackingController {

    private final VisitorTrackingService visitorTrackingService;

    @PostMapping("/api/public/visitors")
    public ResponseEntity<VisitorTrackingDto> trackVisit(@RequestBody VisitorTrackingDto dto) {
        VisitorTrackingDto saved = visitorTrackingService.trackVisit(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/api/visitors/records")
    public ResponseEntity<List<VisitorTrackingDto>> getAllVisitors() {
        return ResponseEntity.ok(visitorTrackingService.getAllVisitors());
    }

    @GetMapping("/api/visitors/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(visitorTrackingService.getStats());
    }
}
