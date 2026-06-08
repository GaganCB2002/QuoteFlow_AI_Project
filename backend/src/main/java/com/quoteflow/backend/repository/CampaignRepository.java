package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, UUID> {
    List<Campaign> findByCompanyId(UUID companyId);
    List<Campaign> findByCompanyIdAndStatus(UUID companyId, String status);
}
