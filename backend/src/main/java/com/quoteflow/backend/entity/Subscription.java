package com.quoteflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String plan;

    @Column(nullable = false)
    private String status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "trial_end_date")
    private LocalDate trialEndDate;

    private BigDecimal price;

    @Column(name = "auto_renew")
    private Boolean autoRenew;

    @Column(name = "max_users")
    private Integer maxUsers;

    @Column(name = "max_quotations")
    private Integer maxQuotations;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (plan == null) plan = "FREE";
        if (status == null) status = "ACTIVE";
        if (autoRenew == null) autoRenew = true;
        if (maxUsers == null) maxUsers = 1;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
