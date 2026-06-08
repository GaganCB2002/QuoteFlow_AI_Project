package com.quoteflow.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class VisitorTrackingDto {
    private UUID id;
    private String page;
    private String referrer;
    private LocalDateTime timestamp;
    private String userAgent;
    private String language;
    private String screen;
    private String name;
    private String email;
    private String phone;
    private String company;
}
