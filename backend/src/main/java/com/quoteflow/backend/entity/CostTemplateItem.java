package com.quoteflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "cost_template_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CostTemplateItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    private CostTemplate template;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "cost_price")
    private BigDecimal costPrice;

    @Column(name = "selling_price")
    private BigDecimal sellingPrice;

    @Column(name = "is_optional")
    private Boolean isOptional;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
