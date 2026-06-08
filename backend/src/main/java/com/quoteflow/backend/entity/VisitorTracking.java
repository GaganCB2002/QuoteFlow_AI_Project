package com.quoteflow.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "visitor_tracking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String page;

    @Column(nullable = false)
    private String referrer;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    private String language;

    private String screen;

    private String name;

    private String email;

    private String phone;

    private String company;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (timestamp == null) timestamp = LocalDateTime.now();
        if (referrer == null) referrer = "direct";
    }
}
