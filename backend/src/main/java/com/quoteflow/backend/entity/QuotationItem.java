package com.quoteflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "quotation_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuotationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id", nullable = false)
    private Quotation quotation;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    private BigDecimal discount;

    @Column(name = "tax_rate")
    private BigDecimal taxRate;

    @Column(nullable = false)
    private BigDecimal total;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Column(name = "ai_suggested")
    private Boolean aiSuggested;

    @Column(name = "sort_order")
    private Integer sortOrder;
}