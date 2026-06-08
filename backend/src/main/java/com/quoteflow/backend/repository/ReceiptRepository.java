package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, UUID> {
    List<Receipt> findByCompanyId(UUID companyId);
    List<Receipt> findByInvoiceId(UUID invoiceId);
}