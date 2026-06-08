package com.quoteflow.backend.dto;

import com.quoteflow.backend.entity.QuotationStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class QuotationDto {
    private UUID id;
    private String quoteNo;
    private UUID companyId;
    private UUID customerId;
    private UUID createdById;
    private List<QuotationItemDto> items;
    private BigDecimal subtotal;
    private String discountType;
    private BigDecimal discountValue;
    private String taxType;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;
    private String currency;
    private QuotationStatus status;
    private Boolean aiGenerated;
    private BigDecimal aiConfidence;
    private Boolean voiceGenerated;
    private String notes;
    private String termsConditions;
    private LocalDate validUntil;
    private LocalDateTime createdAt;
}