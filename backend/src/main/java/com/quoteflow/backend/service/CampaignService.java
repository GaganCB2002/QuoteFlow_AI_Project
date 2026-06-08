package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Campaign;
import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.CampaignRepository;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public Campaign createCampaign(UUID companyId, UUID createdById, String name, String type,
                                    String content, LocalDateTime scheduledAt) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        User createdBy = userRepository.findById(createdById)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Campaign campaign = Campaign.builder()
                .company(company)
                .createdBy(createdBy)
                .name(name)
                .type(type)
                .content(content)
                .scheduledAt(scheduledAt)
                .build();
        return campaignRepository.save(campaign);
    }

    public List<Campaign> getCompanyCampaigns(UUID companyId) {
        return campaignRepository.findByCompanyId(companyId);
    }

    public Campaign getCampaignById(UUID id) {
        return campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
    }

    @Transactional
    public Campaign updateCampaign(UUID id, String name, String content, String status) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        if (name != null) campaign.setName(name);
        if (content != null) campaign.setContent(content);
        if (status != null) campaign.setStatus(status);
        return campaignRepository.save(campaign);
    }

    @Transactional
    public Campaign scheduleCampaign(UUID id, LocalDateTime scheduledAt) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaign.setScheduledAt(scheduledAt);
        campaign.setStatus("SCHEDULED");
        return campaignRepository.save(campaign);
    }

    @Transactional
    public Campaign sendCampaign(UUID id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaign.setSentAt(LocalDateTime.now());
        campaign.setStatus("SENT");
        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(UUID id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaignRepository.delete(campaign);
    }
}
