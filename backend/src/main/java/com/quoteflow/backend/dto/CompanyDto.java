package com.quoteflow.backend.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CompanyDto {
    private UUID id;
    private String companyName;
    private String gstNumber;
    private String logoUrl;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String phone;
    private String email;
}