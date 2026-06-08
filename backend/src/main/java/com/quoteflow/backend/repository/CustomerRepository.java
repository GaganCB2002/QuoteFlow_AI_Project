package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    List<Customer> findByCompanyId(UUID companyId);
    List<Customer> findByCompanyIdAndNameContainingIgnoreCase(UUID companyId, String name);
}
