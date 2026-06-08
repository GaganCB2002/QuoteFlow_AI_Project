package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.CostTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CostTemplateRepository extends JpaRepository<CostTemplate, UUID> {
    List<CostTemplate> findByCompanyId(UUID companyId);
    List<CostTemplate> findByCompanyIdAndIsActiveTrue(UUID companyId);
}
