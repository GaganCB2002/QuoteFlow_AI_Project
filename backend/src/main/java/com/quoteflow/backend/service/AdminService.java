package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AuditLogRepository auditLogRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final QuotationRepository quotationRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getCompanyUsers(UUID companyId) {
        return userRepository.findByCompanyId(companyId);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public List<AuditLog> getCompanyAuditLogs(UUID companyId) {
        return auditLogRepository.findByCompanyIdOrderByCreatedAtDesc(companyId);
    }

    public List<Subscription> getCompanySubscriptions(UUID companyId) {
        return subscriptionRepository.findByCompanyId(companyId);
    }

    @Transactional
    public Subscription updateSubscription(UUID companyId, String plan, String status,
                                             LocalDate endDate, Integer maxUsers, Integer maxQuotations, BigDecimal price) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        List<Subscription> existing = subscriptionRepository.findByCompanyId(companyId);
        Subscription subscription;
        if (existing.isEmpty()) {
            subscription = Subscription.builder()
                    .company(company)
                    .plan(plan)
                    .status(status)
                    .startDate(LocalDate.now())
                    .endDate(endDate)
                    .maxUsers(maxUsers)
                    .maxQuotations(maxQuotations)
                    .price(price)
                    .build();
        } else {
            subscription = existing.get(0);
            if (plan != null) subscription.setPlan(plan);
            if (status != null) subscription.setStatus(status);
            if (endDate != null) subscription.setEndDate(endDate);
            if (maxUsers != null) subscription.setMaxUsers(maxUsers);
            if (maxQuotations != null) subscription.setMaxQuotations(maxQuotations);
            if (price != null) subscription.setPrice(price);
        }
        return subscriptionRepository.save(subscription);
    }

    public Map<String, Object> getAnalyticsSummary() {
        List<Company> companies = companyRepository.findAll();
        long totalCompanies = companies.size();
        long totalUsers = userRepository.count();
        long totalQuotations = 0;
        long activeCompanies = companies.stream().filter(c -> Boolean.TRUE.equals(c.getIsActive())).count();

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalCompanies", totalCompanies);
        summary.put("activeCompanies", activeCompanies);
        summary.put("totalUsers", totalUsers);
        summary.put("totalQuotations", totalQuotations);
        summary.put("reportGeneratedAt", new Date());
        return summary;
    }

    @Transactional
    public void deactivateCompany(UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        company.setIsActive(false);
        companyRepository.save(company);
    }

    @Transactional
    public void activateCompany(UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        company.setIsActive(true);
        companyRepository.save(company);
    }

    public void deleteUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
