package com.quoteflow.backend.controller;

import com.quoteflow.backend.dto.CustomerDto;
import com.quoteflow.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerDto> createCustomer(@RequestBody CustomerDto customerDto) {
        CustomerDto createdCustomer = customerService.createCustomer(customerDto);
        return ResponseEntity.ok(createdCustomer);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<CustomerDto>> getCompanyCustomers(@PathVariable UUID companyId) {
        return ResponseEntity.ok(customerService.getCompanyCustomers(companyId));
    }
}
