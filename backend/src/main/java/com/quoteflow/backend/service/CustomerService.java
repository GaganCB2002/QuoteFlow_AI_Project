package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.CustomerDto;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Customer;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;

    public CustomerDto createCustomer(CustomerDto dto) {
        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Customer customer = Customer.builder()
                .company(company)
                .name(dto.getName())
                .companyName(dto.getCompanyName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .gst(dto.getGst())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .build();

        Customer savedCustomer = customerRepository.save(customer);
        return mapToDto(savedCustomer);
    }

    public List<CustomerDto> getCompanyCustomers(UUID companyId) {
        return customerRepository.findByCompanyId(companyId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private CustomerDto mapToDto(Customer customer) {
        CustomerDto dto = new CustomerDto();
        dto.setId(customer.getId());
        dto.setCompanyId(customer.getCompany().getId());
        dto.setName(customer.getName());
        dto.setCompanyName(customer.getCompanyName());
        dto.setPhone(customer.getPhone());
        dto.setEmail(customer.getEmail());
        dto.setGst(customer.getGst());
        dto.setAddress(customer.getAddress());
        dto.setCity(customer.getCity());
        dto.setState(customer.getState());
        dto.setPincode(customer.getPincode());
        dto.setCreditScore(customer.getCreditScore());
        return dto;
    }
}