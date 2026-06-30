package com.quoteflow.backend.controller;

import com.quoteflow.backend.entity.PaymentTransaction;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<PaymentTransaction>> getAllPayments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(paymentService.getCompanyPayments(user.getCompany().getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentTransaction> getPayment(@PathVariable UUID id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    @PostMapping
    public ResponseEntity<PaymentTransaction> createPayment(@AuthenticationPrincipal User user, @RequestBody Map<String, Object> body) {
        PaymentTransaction created = paymentService.createPayment(
                user.getCompany().getId(),
                body.get("invoiceId") != null ? UUID.fromString((String) body.get("invoiceId")) : null,
                body.get("customerId") != null ? UUID.fromString((String) body.get("customerId")) : null,
                new BigDecimal(body.get("amount").toString()),
                (String) body.get("paymentMode"),
                (String) body.get("transactionId")
        );
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentTransaction> updatePayment(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(paymentService.updatePayment(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable UUID id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create-link")
    public ResponseEntity<Map<String, String>> createPaymentLink(@RequestBody Map<String, Object> body) {
        UUID paymentId = UUID.fromString((String) body.get("paymentId"));
        String link = paymentService.generatePaymentLink(paymentId);
        return ResponseEntity.ok(Map.of("paymentLink", link));
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<PaymentTransaction> refundPayment(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(paymentService.processRefund(id, (String) body.get("reason")));
    }
}
