package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DealRepository extends JpaRepository<Deal, UUID> {
    List<Deal> findByCompanyId(UUID companyId);
    List<Deal> findByCompanyIdAndStage(UUID companyId, String stage);
}
