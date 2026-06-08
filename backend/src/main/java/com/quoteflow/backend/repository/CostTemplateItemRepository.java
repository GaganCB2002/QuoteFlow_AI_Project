package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.CostTemplateItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CostTemplateItemRepository extends JpaRepository<CostTemplateItem, UUID> {
    List<CostTemplateItem> findByTemplateId(UUID templateId);
}
