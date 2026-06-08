package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByCompanyId(UUID companyId);
    List<Document> findByCustomerId(UUID customerId);
    List<Document> findByRelatedEntityTypeAndRelatedEntityId(String relatedEntityType, UUID relatedEntityId);
}
