package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Customer;
import com.quoteflow.backend.entity.Lead;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.CustomerRepository;
import com.quoteflow.backend.repository.LeadRepository;
import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public Lead createLead(UUID companyId, UUID customerId, String source, String notes) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Customer customer = customerId != null ? customerRepository.findById(customerId).orElse(null) : null;
        Lead lead = Lead.builder()
                .company(company)
                .customer(customer)
                .source(source)
                .notes(notes)
                .build();
        return leadRepository.save(lead);
    }

    public List<Lead> getCompanyLeads(UUID companyId) {
        return leadRepository.findByCompanyId(companyId);
    }

    public List<Lead> getLeadsByStatus(UUID companyId, String status) {
        return leadRepository.findByCompanyIdAndStatus(companyId, status);
    }

    public Lead getLeadById(UUID id) {
        return leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
    }

    @Transactional
    public Lead updateLeadStatus(UUID id, String status) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setStatus(status);
        return leadRepository.save(lead);
    }

    @Transactional
    public Lead assignToUser(UUID leadId, UUID userId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        lead.setAssignedTo(user);
        return leadRepository.save(lead);
    }

    public List<Lead> getLeadsByAssignedUser(UUID companyId, UUID userId) {
        return leadRepository.findByCompanyIdAndAssignedToId(companyId, userId);
    }

    public List<Lead> searchLeadsByCustomerName(UUID companyId, String name) {
        return leadRepository.findByCompanyId(companyId).stream()
                .filter(lead -> lead.getCustomer() != null
                        && lead.getCustomer().getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }

    public void deleteLead(UUID id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        leadRepository.delete(lead);
    }
}
