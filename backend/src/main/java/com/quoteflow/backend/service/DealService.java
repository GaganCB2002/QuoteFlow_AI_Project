package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final CompanyRepository companyRepository;
    private final LeadRepository leadRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public Deal createDeal(UUID companyId, String name, BigDecimal amount, Integer probability,
                            LocalDate expectedCloseDate, UUID leadId, UUID customerId, UUID assignedToId, String notes) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Lead lead = leadId != null ? leadRepository.findById(leadId).orElse(null) : null;
        Customer customer = customerId != null ? customerRepository.findById(customerId).orElse(null) : null;
        User assignedTo = assignedToId != null ? userRepository.findById(assignedToId).orElse(null) : null;

        Deal deal = Deal.builder()
                .company(company)
                .lead(lead)
                .customer(customer)
                .name(name)
                .amount(amount)
                .probability(probability)
                .expectedCloseDate(expectedCloseDate)
                .assignedTo(assignedTo)
                .notes(notes)
                .build();
        return dealRepository.save(deal);
    }

    public List<Deal> getCompanyDeals(UUID companyId) {
        return dealRepository.findByCompanyId(companyId);
    }

    public List<Deal> getDealsByStage(UUID companyId, String stage) {
        return dealRepository.findByCompanyIdAndStage(companyId, stage);
    }

    public Deal getDealById(UUID id) {
        return dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
    }

    @Transactional
    public Deal moveStage(UUID dealId, String stage) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
        deal.setStage(stage);
        return dealRepository.save(deal);
    }

    @Transactional
    public Deal updateProbability(UUID dealId, Integer probability) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
        if (probability < 0 || probability > 100) {
            throw new IllegalArgumentException("Probability must be between 0 and 100");
        }
        deal.setProbability(probability);
        return dealRepository.save(deal);
    }

    @Transactional
    public Deal updateDeal(UUID id, String name, BigDecimal amount, Integer probability,
                            LocalDate expectedCloseDate, String notes) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
        if (name != null) deal.setName(name);
        if (amount != null) deal.setAmount(amount);
        if (probability != null) deal.setProbability(probability);
        if (expectedCloseDate != null) deal.setExpectedCloseDate(expectedCloseDate);
        if (notes != null) deal.setNotes(notes);
        return dealRepository.save(deal);
    }

    public void deleteDeal(UUID id) {
        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
        dealRepository.delete(deal);
    }
}
