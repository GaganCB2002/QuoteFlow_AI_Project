package com.quoteflow.backend.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CustomerDto {
    private UUID id;
    private UUID companyId;
    private String name;
    private String companyName;
    private String phone;
    private String email;
    private String gst;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Integer creditScore;
}