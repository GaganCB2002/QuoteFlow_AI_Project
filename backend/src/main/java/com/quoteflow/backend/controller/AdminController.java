package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.AuditLog;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Subscription;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@AuthenticationPrincipal User user) {
        if (user.getCompany() != null) {
            return ResponseEntity.ok(adminService.getCompanyUsers(user.getCompany().getId()));
        }
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getCompanies() {
        return ResponseEntity.ok(adminService.getAllCompanies());
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(adminService.getCompanyAuditLogs(user.getCompany().getId()));
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(adminService.getAnalyticsSummary());
    }

    @PutMapping("/subscription/{companyId}")
    public ResponseEntity<Subscription> updateSubscription(@PathVariable UUID companyId, @RequestBody Map<String, Object> body) {
        Subscription updated = adminService.updateSubscription(
                companyId,
                (String) body.get("plan"),
                (String) body.get("status"),
                body.get("endDate") != null ? LocalDate.parse((String) body.get("endDate")) : null,
                body.get("maxUsers") != null ? (Integer) body.get("maxUsers") : null,
                body.get("maxQuotations") != null ? (Integer) body.get("maxQuotations") : null,
                body.get("price") != null ? new BigDecimal(body.get("price").toString()) : null
        );
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/subscription")
    public ResponseEntity<List<Subscription>> getSubscription(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(adminService.getCompanySubscriptions(user.getCompany().getId()));
    }
}
