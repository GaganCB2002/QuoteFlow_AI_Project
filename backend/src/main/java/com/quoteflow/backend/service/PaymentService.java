package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.*;
import com.quoteflow.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentTransactionRepository paymentTransactionRepository;
    private final CompanyRepository companyRepository;
    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public PaymentTransaction createPayment(UUID companyId, UUID invoiceId, UUID customerId,
                                             BigDecimal amount, String paymentMode, String transactionId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        Invoice invoice = invoiceId != null ? invoiceRepository.findById(invoiceId).orElse(null) : null;
        Customer customer = customerId != null ? customerRepository.findById(customerId).orElse(null) : null;

        PaymentTransaction payment = PaymentTransaction.builder()
                .company(company)
                .invoice(invoice)
                .customer(customer)
                .amount(amount)
                .paymentMode(paymentMode)
                .transactionId(transactionId)
                .status("COMPLETED")
                .paymentDate(LocalDateTime.now())
                .build();
        PaymentTransaction saved = paymentTransactionRepository.save(payment);

        try {
            List<User> companyUsers = userRepository.findByCompanyId(companyId);
            for (User u : companyUsers) {
                u.setSubscriptionStatus("ACTIVE");
                userRepository.save(u);
            }
        } catch (Exception ignored) {}

        return saved;
    }

    public List<PaymentTransaction> getCompanyPayments(UUID companyId) {
        return paymentTransactionRepository.findByCompanyId(companyId);
    }

    public List<PaymentTransaction> getInvoicePayments(UUID invoiceId) {
        return paymentTransactionRepository.findByInvoiceId(invoiceId);
    }

    public List<PaymentTransaction> getPaymentsByStatus(String status) {
        return paymentTransactionRepository.findByStatus(status);
    }

    public PaymentTransaction getPaymentById(UUID id) {
        return paymentTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public String generatePaymentLink(UUID paymentId) {
        PaymentTransaction payment = paymentTransactionRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return "https://pay.quoteflow.com/pay/" + payment.getId() + "/" + UUID.randomUUID();
    }

    @Transactional
    public PaymentTransaction processRefund(UUID paymentId, String reason) {
        PaymentTransaction payment = paymentTransactionRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus("REFUNDED");
        payment.setGatewayResponse(reason);
        return paymentTransactionRepository.save(payment);
    }

    public void deletePayment(UUID id) {
        PaymentTransaction payment = paymentTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        paymentTransactionRepository.delete(payment);
    }
}
