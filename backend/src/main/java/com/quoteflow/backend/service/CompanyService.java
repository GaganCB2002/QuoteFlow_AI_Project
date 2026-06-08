package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.CompanyDto;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyDto createCompany(CompanyDto dto, User user) {
        Company company = Company.builder()
                .owner(user)
                .companyName(dto.getCompanyName())
                .gstNumber(dto.getGstNumber())
                .logoUrl(dto.getLogoUrl())
                .address(dto.getAddress())
                .phone(user.getPhone())
                .city(dto.getCity() != null ? dto.getCity() : "")
                .state(dto.getState() != null ? dto.getState() : "")
                .pincode(dto.getPincode() != null ? dto.getPincode() : "")
                .build();

        Company savedCompany = companyRepository.save(company);
        return mapToDto(savedCompany);
    }

    public List<CompanyDto> getUserCompanies(User user) {
        return companyRepository.findByOwnerId(user.getId())
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private CompanyDto mapToDto(Company company) {
        CompanyDto dto = new CompanyDto();
        dto.setId(company.getId());
        dto.setCompanyName(company.getCompanyName());
        dto.setGstNumber(company.getGstNumber());
        dto.setLogoUrl(company.getLogoUrl());
        dto.setAddress(company.getAddress());
        dto.setCity(company.getCity());
        dto.setState(company.getState());
        dto.setPincode(company.getPincode());
        dto.setPhone(company.getPhone());
        dto.setEmail(company.getEmail());
        return dto;
    }
}