package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.LandingLeadDto;
import com.quoteflow.backend.entity.LandingLead;
import com.quoteflow.backend.repository.LandingLeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LandingLeadService {

    private final LandingLeadRepository landingLeadRepository;

    public LandingLeadDto submitLead(LandingLeadDto dto) {
        LandingLead lead = LandingLead.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .company(dto.getCompany())
                .message(dto.getMessage())
                .source(dto.getSource() != null ? dto.getSource() : "/")
                .contacted(false)
                .build();
        LandingLead saved = landingLeadRepository.save(lead);
        return mapToDto(saved);
    }

    public List<LandingLeadDto> getAllLeads() {
        return landingLeadRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public LandingLeadDto getLeadById(UUID id) {
        LandingLead lead = landingLeadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        return mapToDto(lead);
    }

    @Transactional
    public LandingLeadDto markContacted(UUID id) {
        LandingLead lead = landingLeadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setContacted(true);
        LandingLead saved = landingLeadRepository.save(lead);
        return mapToDto(saved);
    }

    public Map<String, Object> getStats() {
        long totalLeads = landingLeadRepository.count();
        long uncontacted = landingLeadRepository.countByContactedFalse();
        return Map.of("total", totalLeads, "uncontacted", uncontacted);
    }

    private LandingLeadDto mapToDto(LandingLead lead) {
        LandingLeadDto dto = new LandingLeadDto();
        dto.setId(lead.getId());
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCompany(lead.getCompany());
        dto.setMessage(lead.getMessage());
        dto.setContacted(lead.getContacted());
        dto.setSource(lead.getSource());
        dto.setCreatedAt(lead.getCreatedAt());
        return dto;
    }
}
