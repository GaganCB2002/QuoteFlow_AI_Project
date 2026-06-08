package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface IncomeRepository extends JpaRepository<Income, UUID> {
    List<Income> findByCompanyId(UUID companyId);
    List<Income> findByCompanyIdAndIncomeDateBetween(UUID companyId, LocalDate start, LocalDate end);
}
