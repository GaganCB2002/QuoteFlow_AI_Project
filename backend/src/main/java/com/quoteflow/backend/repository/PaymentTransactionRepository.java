package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, UUID> {
    List<PaymentTransaction> findByCompanyId(UUID companyId);
    List<PaymentTransaction> findByInvoiceId(UUID invoiceId);
    List<PaymentTransaction> findByStatus(String status);
}
