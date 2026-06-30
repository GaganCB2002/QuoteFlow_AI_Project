package com.quoteflow.backend.dto;

import lombok.Data;

@Data
public class AiQuotationRequest {
    private String description;
    private String customerName;
    private String customerEmail;
    private String customerCompany;
    private String customerPhone;
}
