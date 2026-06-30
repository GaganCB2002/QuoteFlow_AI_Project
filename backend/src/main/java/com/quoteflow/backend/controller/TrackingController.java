package com.quoteflow.backend.controller;

import com.quoteflow.backend.service.UserTrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final UserTrackingService userTrackingService;

    @PostMapping("/location")
    public ResponseEntity<Map<String, Object>> trackLocation(@RequestBody Map<String, Object> locationData) {
        return ResponseEntity.ok(userTrackingService.trackLocation(locationData));
    }

    @PostMapping("/activity")
    public ResponseEntity<Map<String, Object>> logActivity(@RequestBody Map<String, Object> activityData) {
        return ResponseEntity.ok(userTrackingService.logActivity(activityData));
    }

    @GetMapping("/locations")
    public ResponseEntity<List<Map<String, Object>>> getAllLocations() {
        return ResponseEntity.ok(userTrackingService.getAllLocations());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<Map<String, Object>>> getAllActivities() {
        return ResponseEntity.ok(userTrackingService.getAllActivities());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        return ResponseEntity.ok(userTrackingService.getUserSessionSummary());
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, Object>> clearData() {
        return ResponseEntity.ok(userTrackingService.clearTrackingData());
    }
}
