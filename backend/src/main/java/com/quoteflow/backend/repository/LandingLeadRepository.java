package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.LandingLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LandingLeadRepository extends JpaRepository<LandingLead, UUID> {
    List<LandingLead> findAllByOrderByCreatedAtDesc();
    long countByContactedFalse();
}
