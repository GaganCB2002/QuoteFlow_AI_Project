package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.QuotationDto;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.QuotationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/quotations")
@RequiredArgsConstructor
public class QuotationController {

    private final QuotationService quotationService;

    @PostMapping
    public ResponseEntity<QuotationDto> createQuotation(@RequestBody QuotationDto quotationDto,
                                                        @AuthenticationPrincipal User user) {
        QuotationDto created = quotationService.createQuotation(quotationDto, user);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<QuotationDto>> getCustomerQuotations(@PathVariable UUID customerId) {
        return ResponseEntity.ok(quotationService.getCustomerQuotations(customerId));
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<QuotationDto>> getCompanyQuotations(@PathVariable UUID companyId) {
        return ResponseEntity.ok(quotationService.getCompanyQuotations(companyId));
    }
}