package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Quotation;
import com.quoteflow.backend.entity.QuotationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, UUID> {
    List<Quotation> findByCustomerId(UUID customerId);
    List<Quotation> findByCompanyId(UUID companyId);
    List<Quotation> findByCompanyIdAndStatus(UUID companyId, QuotationStatus status);
    long countByCompanyId(UUID companyId);
}
