package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.ApprovalWorkflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApprovalWorkflowRepository extends JpaRepository<ApprovalWorkflow, UUID> {
    List<ApprovalWorkflow> findByQuotationId(UUID quotationId);
    List<ApprovalWorkflow> findByCompanyIdAndStatus(UUID companyId, String status);
    List<ApprovalWorkflow> findByApprovedByIdAndStatus(UUID userId, String status);
}
