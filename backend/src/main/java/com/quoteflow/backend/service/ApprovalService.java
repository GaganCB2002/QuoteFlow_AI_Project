package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ApprovalWorkflowRepository approvalWorkflowRepository;
    private final QuotationRepository quotationRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApprovalWorkflow submitForApproval(UUID quotationId, UUID requestedById) {
        Quotation quotation = quotationRepository.findById(quotationId)
                .orElseThrow(() -> new RuntimeException("Quotation not found"));
        User requestedBy = userRepository.findById(requestedById)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ApprovalWorkflow approval = ApprovalWorkflow.builder()
                .company(quotation.getCompany())
                .quotation(quotation)
                .requestedBy(requestedBy)
                .status("PENDING")
                .level(1)
                .build();
        return approvalWorkflowRepository.save(approval);
    }

    @Transactional
    public ApprovalWorkflow approve(UUID approvalId, UUID approvedById, String comments) {
        ApprovalWorkflow approval = approvalWorkflowRepository.findById(approvalId)
                .orElseThrow(() -> new RuntimeException("Approval not found"));
        User approvedBy = userRepository.findById(approvedById)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"PENDING".equals(approval.getStatus())) {
            throw new RuntimeException("Approval is not in PENDING status");
        }

        approval.setStatus("APPROVED");
        approval.setApprovedBy(approvedBy);
        approval.setComments(comments);

        if (approval.getLevel() < approval.getMaxLevel()) {
            ApprovalWorkflow nextLevel = ApprovalWorkflow.builder()
                    .company(approval.getCompany())
                    .quotation(approval.getQuotation())
                    .requestedBy(approval.getRequestedBy())
                    .status("PENDING")
                    .level(approval.getLevel() + 1)
                    .maxLevel(approval.getMaxLevel())
                    .build();
            approvalWorkflowRepository.save(nextLevel);
        }

        return approvalWorkflowRepository.save(approval);
    }

    @Transactional
    public ApprovalWorkflow reject(UUID approvalId, UUID approvedById, String comments) {
        ApprovalWorkflow approval = approvalWorkflowRepository.findById(approvalId)
                .orElseThrow(() -> new RuntimeException("Approval not found"));
        User approvedBy = userRepository.findById(approvedById)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"PENDING".equals(approval.getStatus())) {
            throw new RuntimeException("Approval is not in PENDING status");
        }

        approval.setStatus("REJECTED");
        approval.setApprovedBy(approvedBy);
        approval.setComments(comments);
        return approvalWorkflowRepository.save(approval);
    }

    public List<ApprovalWorkflow> getPendingApprovals(UUID companyId) {
        return approvalWorkflowRepository.findByCompanyIdAndStatus(companyId, "PENDING");
    }

    public List<ApprovalWorkflow> getApprovalsByQuotation(UUID quotationId) {
        return approvalWorkflowRepository.findByQuotationId(quotationId);
    }

    public List<ApprovalWorkflow> getApprovalsByUser(UUID userId) {
        return approvalWorkflowRepository.findByApprovedByIdAndStatus(userId, "PENDING");
    }
}
