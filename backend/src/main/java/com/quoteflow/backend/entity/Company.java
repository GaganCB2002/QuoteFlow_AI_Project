package com.quoteflow.backend.entity;

import com.quoteflow.backend.security.EncryptedAttributeConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "gst_number", unique = true)
    private String gstNumber;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "signature_url")
    private String signatureUrl;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account", columnDefinition = "TEXT")
    @Convert(converter = EncryptedAttributeConverter.class)
    private String bankAccount;

    @Column(name = "ifsc_code", columnDefinition = "TEXT")
    @Convert(converter = EncryptedAttributeConverter.class)
    private String ifscCode;

    @Column(nullable = false)
    private String phone;

    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String pincode;

    @Column(nullable = false)
    private String currency;

    @Column(name = "invoice_prefix")
    private String invoicePrefix;

    @Column(name = "quote_prefix")
    private String quotePrefix;

    @Column(name = "receipt_prefix")
    private String receiptPrefix;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) isActive = true;
        if (currency == null) currency = "INR";
        if (invoicePrefix == null) invoicePrefix = "INV-";
        if (quotePrefix == null) quotePrefix = "Q-";
        if (receiptPrefix == null) receiptPrefix = "RCP-";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}