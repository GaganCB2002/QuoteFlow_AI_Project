package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.Expense;
import com.quoteflow.backend.entity.Income;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.FinanceService;
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
@RequestMapping("/api/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    @GetMapping("/income")
    public ResponseEntity<List<Income>> getIncome(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(financeService.getCompanyIncomes(user.getCompany().getId()));
    }

    @PostMapping("/income")
    public ResponseEntity<Income> addIncome(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Income created = financeService.createIncome(
                user.getCompany().getId(),
                body.get("invoiceId") != null ? UUID.fromString((String) body.get("invoiceId")) : null,
                body.get("customerId") != null ? UUID.fromString((String) body.get("customerId")) : null,
                (String) body.get("description"),
                new BigDecimal(body.get("amount").toString()),
                body.get("incomeDate") != null ? LocalDate.parse((String) body.get("incomeDate")) : LocalDate.now(),
                (String) body.get("paymentMode"),
                (String) body.get("reference")
        );
        return ResponseEntity.ok(created);
    }

    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getExpenses(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(financeService.getCompanyExpenses(user.getCompany().getId()));
    }

    @PostMapping("/expenses")
    public ResponseEntity<Expense> addExpense(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        Expense created = financeService.createExpense(
                user.getCompany().getId(),
                user.getId(),
                (String) body.get("category"),
                (String) body.get("description"),
                new BigDecimal(body.get("amount").toString()),
                body.get("taxAmount") != null ? new BigDecimal(body.get("taxAmount").toString()) : null,
                body.get("expenseDate") != null ? LocalDate.parse((String) body.get("expenseDate")) : LocalDate.now(),
                (String) body.get("paymentMode"),
                (String) body.get("reference")
        );
        return ResponseEntity.ok(created);
    }

    @GetMapping("/profit-loss")
    public ResponseEntity<Map<String, Object>> getProfitLoss(@AuthenticationPrincipal User user,
                                                              @RequestParam String start,
                                                              @RequestParam String end) {
        return ResponseEntity.ok(financeService.getProfitLoss(
                user.getCompany().getId(),
                LocalDate.parse(start),
                LocalDate.parse(end)
        ));
    }

    @GetMapping("/gst-report")
    public ResponseEntity<Map<String, Object>> getGstReport(@AuthenticationPrincipal User user,
                                                             @RequestParam(required = false) String start,
                                                             @RequestParam(required = false) String end) {
        LocalDate startDate = start != null ? LocalDate.parse(start) : LocalDate.now().withDayOfMonth(1);
        LocalDate endDate = end != null ? LocalDate.parse(end) : LocalDate.now();
        return ResponseEntity.ok(financeService.getGstReport(user.getCompany().getId(), startDate, endDate));
    }

    @GetMapping("/cash-flow")
    public ResponseEntity<Map<String, Object>> getCashFlow(@AuthenticationPrincipal User user,
                                                            @RequestParam(required = false) String start,
                                                            @RequestParam(required = false) String end) {
        LocalDate startDate = start != null ? LocalDate.parse(start) : LocalDate.now().minusMonths(12);
        LocalDate endDate = end != null ? LocalDate.parse(end) : LocalDate.now();
        return ResponseEntity.ok(financeService.getCashFlow(user.getCompany().getId(), startDate, endDate));
    }
}
