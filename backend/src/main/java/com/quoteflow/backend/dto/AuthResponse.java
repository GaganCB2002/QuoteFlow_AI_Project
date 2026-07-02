package com.quoteflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String userId;
    private String userName;
    private String userEmail;
    private String companyName;
    private String role;
    private boolean requiresTfa;
}
