package com.quoteflow.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class QuotationItemDto {
    private UUID id;
    private String itemName;
    private String description;
    private BigDecimal quantity;
    private BigDecimal unitPrice;
    private BigDecimal discount;
    private BigDecimal taxRate;
    private BigDecimal total;
    private BigDecimal costPrice;
    private Boolean aiSuggested;
    private Integer sortOrder;
}