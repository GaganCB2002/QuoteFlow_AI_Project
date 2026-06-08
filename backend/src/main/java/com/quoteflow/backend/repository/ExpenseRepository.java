package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, UUID> {
    List<Expense> findByCompanyId(UUID companyId);
    List<Expense> findByCompanyIdAndExpenseDateBetween(UUID companyId, LocalDate start, LocalDate end);
}
