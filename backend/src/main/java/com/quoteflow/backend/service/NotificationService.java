package com.quoteflow.backend.service;

import com.quoteflow.backend.entity.Company;
import com.quoteflow.backend.entity.Notification;
import com.quoteflow.backend.entity.User;
import com.quoteflow.backend.repository.CompanyRepository;
import com.quoteflow.backend.repository.NotificationRepository;
import com.quoteflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public Notification createNotification(UUID companyId, UUID userId, String type,
                                            String title, String message, String link) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Notification notification = Notification.builder()
                .company(company)
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .link(link)
                .build();
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(UUID userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotifications(UUID userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId);
    }

    public long getUnreadCount(UUID userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Transactional
    public Notification markAsRead(UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        return notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead(UUID userId) {
        List<Notification> unread = notificationRepository.findByUserIdAndIsReadFalse(userId);
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    public void deleteNotification(UUID id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notificationRepository.delete(notification);
    }
}
