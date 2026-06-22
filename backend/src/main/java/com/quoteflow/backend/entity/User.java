package com.quoteflow.backend.entity;

import com.quoteflow.backend.security.EncryptedAttributeConverter;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(nullable = false)
    private String name;

    @Column(name = "email")
    @Convert(converter = EncryptedAttributeConverter.class)
    private String email;

    @Column(name = "phone", nullable = false)
    @Convert(converter = EncryptedAttributeConverter.class)
    private String phone;

    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "phone_hash", unique = true)
    private String phoneHash;

    @Column(name = "email_hash")
    private String emailHash;

    @Column(name = "registration_ip")
    private String registrationIp;

    @Column(name = "registration_user_agent", columnDefinition = "TEXT")
    private String registrationUserAgent;

    @Column(name = "trial_start_date")
    private LocalDateTime trialStartDate;

    @Column(name = "trial_end_date")
    private LocalDateTime trialEndDate;

    @Column(name = "subscription_status")
    private String subscriptionStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) isActive = true;
        if (subscriptionStatus == null) subscriptionStatus = "TRIAL";
        if (trialStartDate == null) trialStartDate = LocalDateTime.now();
        if (trialEndDate == null) trialEndDate = LocalDateTime.now().plusDays(7);
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        return this.phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive != null && isActive;
    }
}
