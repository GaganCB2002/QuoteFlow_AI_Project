package com.quoteflow.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class LandingLeadDto {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String company;
    private String message;
    private Boolean contacted;
    private String source;
    private LocalDateTime createdAt;
}
