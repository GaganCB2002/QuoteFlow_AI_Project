package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.CompanyDto;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto, @AuthenticationPrincipal User user) {
        CompanyDto createdCompany = companyService.createCompany(companyDto, user);
        return ResponseEntity.ok(createdCompany);
    }

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getUserCompanies(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(companyService.getUserCompanies(user));
    }
}
