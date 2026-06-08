package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.InvoiceRepository;
import com.quoteflow.backend.repository.QuotationRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final QuotationRepository quotationRepository;
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats(@AuthenticationPrincipal User user) {
        Map<String, Object> stats = new LinkedHashMap<>();

        if (user.getCompany() != null) {
            UUID companyId = user.getCompany().getId();
            long quotesCount = quotationRepository.findByCompanyId(companyId).size();
            long invoicesCount = invoiceRepository.findByCompanyId(companyId).size();
            long customersCount = customerRepository.findByCompanyId(companyId).size();

            stats.put("quotationsThisMonth", quotesCount);
            stats.put("invoicesThisMonth", invoicesCount);
            stats.put("customers", customersCount);
        }

        stats.put("status", "ok");
        stats.put("username", user.getName());
        return ResponseEntity.ok(stats);
    }
}