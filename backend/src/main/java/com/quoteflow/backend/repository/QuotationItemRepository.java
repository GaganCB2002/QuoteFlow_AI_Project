package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.QuotationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuotationItemRepository extends JpaRepository<QuotationItem, UUID> {
}
