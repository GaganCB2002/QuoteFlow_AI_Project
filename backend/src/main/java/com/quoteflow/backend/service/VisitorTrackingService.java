package com.quoteflow.backend.service;

import com.quoteflow.backend.dto.VisitorTrackingDto;
import com.quoteflow.backend.entity.VisitorTracking;
import com.quoteflow.backend.repository.LandingLeadRepository;
import com.quoteflow.backend.repository.VisitorTrackingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitorTrackingService {

    private final VisitorTrackingRepository visitorTrackingRepository;
    private final LandingLeadRepository landingLeadRepository;

    public VisitorTrackingDto trackVisit(VisitorTrackingDto dto) {
        VisitorTracking visitor = VisitorTracking.builder()
                .page(dto.getPage() != null ? dto.getPage() : "/")
                .referrer(dto.getReferrer() != null ? dto.getReferrer() : "direct")
                .timestamp(dto.getTimestamp() != null ? dto.getTimestamp() : LocalDateTime.now())
                .userAgent(dto.getUserAgent())
                .language(dto.getLanguage())
                .screen(dto.getScreen())
                .name(dto.getName() != null ? dto.getName() : "")
                .email(dto.getEmail() != null ? dto.getEmail() : "")
                .phone(dto.getPhone() != null ? dto.getPhone() : "")
                .company(dto.getCompany() != null ? dto.getCompany() : "")
                .build();
        VisitorTracking saved = visitorTrackingRepository.save(visitor);
        return mapToDto(saved);
    }

    public List<VisitorTrackingDto> getAllVisitors() {
        return visitorTrackingRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public VisitorTrackingDto getVisitorById(UUID id) {
        VisitorTracking visitor = visitorTrackingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));
        return mapToDto(visitor);
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalVisitors = visitorTrackingRepository.count();
        LocalDateTime todayStart = LocalDateTime.of(LocalDate.now(), LocalTime.MIDNIGHT);
        long todayCount = visitorTrackingRepository.countByTimestampAfter(todayStart);
        long leadsCount = landingLeadRepository.count();
        stats.put("total", totalVisitors);
        stats.put("today", todayCount);
        stats.put("leads", leadsCount);
        stats.put("conversionRate", totalVisitors > 0
                ? Math.round((double) leadsCount / totalVisitors * 100) + "%"
                : "0%");
        return stats;
    }

    private VisitorTrackingDto mapToDto(VisitorTracking visitor) {
        VisitorTrackingDto dto = new VisitorTrackingDto();
        dto.setId(visitor.getId());
        dto.setPage(visitor.getPage());
        dto.setReferrer(visitor.getReferrer());
        dto.setTimestamp(visitor.getTimestamp());
        dto.setUserAgent(visitor.getUserAgent());
        dto.setLanguage(visitor.getLanguage());
        dto.setScreen(visitor.getScreen());
        dto.setName(visitor.getName());
        dto.setEmail(visitor.getEmail());
        dto.setPhone(visitor.getPhone());
        dto.setCompany(visitor.getCompany());
        return dto;
    }
}
