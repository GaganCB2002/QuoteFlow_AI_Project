package com.quoteflow.backend.repository;

import com.quoteflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByPhoneHash(String phoneHash);
    Optional<User> findByEmailHash(String emailHash);
    boolean existsByPhoneHash(String phoneHash);
    boolean existsByEmailHash(String emailHash);
    List<User> findByCompanyId(UUID companyId);
}
