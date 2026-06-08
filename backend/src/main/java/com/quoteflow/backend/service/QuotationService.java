package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.QuotationDto;
import com.quoteflow.backend.dto.QuotationItemDto;
import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import com.quoteflow.backend.repository.QuotationRepository;
import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final QuotationRepository quotationRepository;
    private final CustomerRepository customerRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public QuotationDto createQuotation(QuotationDto dto, User currentUser) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Quotation quotation = Quotation.builder()
                .quoteNo(generateQuoteNumber(company))
                .company(company)
                .customer(customer)
                .createdBy(currentUser)
                .subtotal(dto.getSubtotal())
                .discountType(dto.getDiscountType())
                .discountValue(dto.getDiscountValue())
                .taxType(dto.getTaxType())
                .taxAmount(dto.getTaxAmount())
                .totalAmount(dto.getTotalAmount())
                .currency(dto.getCurrency() != null ? dto.getCurrency() : "INR")
                .status(QuotationStatus.DRAFT)
                .aiGenerated(dto.getAiGenerated())
                .aiConfidence(dto.getAiConfidence())
                .voiceGenerated(dto.getVoiceGenerated())
                .notes(dto.getNotes())
                .termsConditions(dto.getTermsConditions())
                .validUntil(dto.getValidUntil())
                .build();

        List<QuotationItem> items = dto.getItems().stream().map(itemDto ->
                QuotationItem.builder()
                        .quotation(quotation)
                        .itemName(itemDto.getItemName())
                        .description(itemDto.getDescription())
                        .quantity(itemDto.getQuantity())
                        .unitPrice(itemDto.getUnitPrice())
                        .discount(itemDto.getDiscount())
                        .taxRate(itemDto.getTaxRate())
                        .total(itemDto.getTotal())
                        .costPrice(itemDto.getCostPrice())
                        .aiSuggested(itemDto.getAiSuggested())
                        .sortOrder(itemDto.getSortOrder())
                        .build()
        ).collect(Collectors.toList());

        quotation.setItems(items);
        Quotation savedQuotation = quotationRepository.save(quotation);
        return mapToDto(savedQuotation);
    }

    public List<QuotationDto> getCustomerQuotations(UUID customerId) {
        return quotationRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<QuotationDto> getCompanyQuotations(UUID companyId) {
        return quotationRepository.findByCompanyId(companyId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private String generateQuoteNumber(Company company) {
        String prefix = company.getQuotePrefix() != null ? company.getQuotePrefix() : "Q-";
        return prefix + System.currentTimeMillis();
    }

    private QuotationDto mapToDto(Quotation quotation) {
        QuotationDto dto = new QuotationDto();
        dto.setId(quotation.getId());
        dto.setQuoteNo(quotation.getQuoteNo());
        dto.setCompanyId(quotation.getCompany().getId());
        dto.setCustomerId(quotation.getCustomer().getId());
        dto.setCreatedById(quotation.getCreatedBy().getId());
        dto.setSubtotal(quotation.getSubtotal());
        dto.setDiscountType(quotation.getDiscountType());
        dto.setDiscountValue(quotation.getDiscountValue());
        dto.setTaxType(quotation.getTaxType());
        dto.setTaxAmount(quotation.getTaxAmount());
        dto.setTotalAmount(quotation.getTotalAmount());
        dto.setCurrency(quotation.getCurrency());
        dto.setStatus(quotation.getStatus());
        dto.setAiGenerated(quotation.getAiGenerated());
        dto.setAiConfidence(quotation.getAiConfidence());
        dto.setVoiceGenerated(quotation.getVoiceGenerated());
        dto.setNotes(quotation.getNotes());
        dto.setTermsConditions(quotation.getTermsConditions());
        dto.setValidUntil(quotation.getValidUntil());
        dto.setCreatedAt(quotation.getCreatedAt());

        dto.setItems(quotation.getItems().stream().map(item -> {
            QuotationItemDto itemDto = new QuotationItemDto();
            itemDto.setId(item.getId());
            itemDto.setItemName(item.getItemName());
            itemDto.setDescription(item.getDescription());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setUnitPrice(item.getUnitPrice());
            itemDto.setDiscount(item.getDiscount());
            itemDto.setTaxRate(item.getTaxRate());
            itemDto.setTotal(item.getTotal());
            itemDto.setCostPrice(item.getCostPrice());
            itemDto.setAiSuggested(item.getAiSuggested());
            itemDto.setSortOrder(item.getSortOrder());
            return itemDto;
        }).collect(Collectors.toList()));

        return dto;
    }
}