package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByCompanyId(UUID companyId);
    List<Product> findByCompanyIdAndType(UUID companyId, String type);
    List<Product> findByCompanyIdAndIsActiveTrue(UUID companyId);
}
