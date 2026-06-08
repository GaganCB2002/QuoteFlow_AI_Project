package com.quoteflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "quotations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "quote_no", nullable = false, unique = true)
    private String quoteNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Enumerated(EnumType.STRING)
    private QuotationStatus status;

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "discount_value")
    private BigDecimal discountValue;

    @Column(name = "tax_type")
    private String taxType;

    @Column(name = "tax_amount")
    private BigDecimal taxAmount;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String currency;

    @Column(name = "ai_generated")
    private Boolean aiGenerated;

    @Column(name = "ai_confidence")
    private BigDecimal aiConfidence;

    @Column(name = "voice_generated")
    private Boolean voiceGenerated;

    @Column(name = "project_type")
    private String projectType;

    @Column(name = "estimated_cost")
    private BigDecimal estimatedCost;

    @Column(name = "minimum_profit")
    private BigDecimal minimumProfit;

    @Column(name = "recommended_quote")
    private BigDecimal recommendedQuote;

    @Column(name = "best_quote")
    private BigDecimal bestQuote;

    @Column(name = "premium_quote")
    private BigDecimal premiumQuote;

    @Column(name = "loss_detected")
    private Boolean lossDetected;

    @Column(columnDefinition = "TEXT")
    private String deliverables;

    @Column(name = "not_included", columnDefinition = "TEXT")
    private String notIncluded;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "payment_milestones", columnDefinition = "TEXT")
    private String paymentMilestones;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "terms_conditions", columnDefinition = "TEXT")
    private String termsConditions;

    @Column(name = "valid_until")
    private LocalDate validUntil;

    @Builder.Default
    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuotationItem> items = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = QuotationStatus.DRAFT;
        if (currency == null) currency = "INR";
        if (lossDetected == null) lossDetected = false;
        if (approvalStatus == null) approvalStatus = "DRAFT";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}