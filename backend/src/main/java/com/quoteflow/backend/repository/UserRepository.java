package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByEmail(String email);
    Optional<User> findByGoogleId(String googleId);
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);
    List<User> findByCompanyId(UUID companyId);
}
