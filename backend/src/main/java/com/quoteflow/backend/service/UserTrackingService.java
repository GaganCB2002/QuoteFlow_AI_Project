package com.quoteflow.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class UserTrackingService {

    private static final String TRACKING_DIR = "tracking-data";
    private static final String LOCATIONS_FILE = "locations.json";
    private static final String ACTIVITY_FILE = "activity.json";
    private final Path trackingPath;
    private final ObjectMapper mapper;

    public UserTrackingService() {
        this.trackingPath = Paths.get(System.getProperty("user.dir"), TRACKING_DIR);
        this.mapper = new ObjectMapper();
        this.mapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(trackingPath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create tracking directory", e);
        }
    }

    public Map<String, Object> trackLocation(Map<String, Object> locationData) {
        try {
            Path file = trackingPath.resolve(LOCATIONS_FILE);
            List<Map<String, Object>> locations = new ArrayList<>();
            if (Files.exists(file)) {
                String content = Files.readString(file);
                List existing = mapper.readValue(content, List.class);
                locations.addAll(existing);
            }

            Map<String, Object> entry = new LinkedHashMap<>(locationData);
            entry.putIfAbsent("timestamp", LocalDateTime.now().toString());
            entry.putIfAbsent("userId", "anonymous");
            entry.putIfAbsent("ip", "0.0.0.0");
            entry.putIfAbsent("latitude", 0.0);
            entry.putIfAbsent("longitude", 0.0);
            entry.putIfAbsent("city", "Unknown");
            entry.putIfAbsent("country", "Unknown");
            entry.putIfAbsent("browser", "Unknown");
            entry.putIfAbsent("os", "Unknown");
            entry.putIfAbsent("device", "Unknown");
            entry.putIfAbsent("screenResolution", "Unknown");
            entry.putIfAbsent("language", "Unknown");
            entry.putIfAbsent("timezone", "Unknown");
            entry.putIfAbsent("userAgent", "Unknown");
            entry.putIfAbsent("referrer", "Unknown");
            entry.putIfAbsent("pageUrl", "Unknown");

            locations.add(entry);
            mapper.writeValue(file.toFile(), locations);

            return Map.of(
                "status", "tracked",
                "timestamp", entry.get("timestamp"),
                "locationCount", locations.size()
            );
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }

    public Map<String, Object> logActivity(Map<String, Object> activityData) {
        try {
            Path file = trackingPath.resolve(ACTIVITY_FILE);
            List<Map<String, Object>> activities = new ArrayList<>();
            if (Files.exists(file)) {
                String content = Files.readString(file);
                List existing = mapper.readValue(content, List.class);
                activities.addAll(existing);
            }

            Map<String, Object> entry = new LinkedHashMap<>(activityData);
            entry.putIfAbsent("timestamp", LocalDateTime.now().toString());
            entry.putIfAbsent("userId", "anonymous");
            entry.putIfAbsent("action", "unknown");
            entry.putIfAbsent("page", "unknown");
            entry.putIfAbsent("details", "");
            entry.putIfAbsent("ip", "0.0.0.0");

            activities.add(entry);

            if (activities.size() > 10000) {
                activities = activities.subList(activities.size() - 10000, activities.size());
            }

            mapper.writeValue(file.toFile(), activities);

            return Map.of(
                "status", "logged",
                "timestamp", entry.get("timestamp"),
                "activityCount", activities.size()
            );
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }

    public List<Map<String, Object>> getAllLocations() {
        try {
            Path file = trackingPath.resolve(LOCATIONS_FILE);
            if (!Files.exists(file)) return List.of();
            String content = Files.readString(file);
            return mapper.readValue(content, List.class);
        } catch (Exception e) {
            return List.of();
        }
    }

    public List<Map<String, Object>> getAllActivities() {
        try {
            Path file = trackingPath.resolve(ACTIVITY_FILE);
            if (!Files.exists(file)) return List.of();
            String content = Files.readString(file);
            return mapper.readValue(content, List.class);
        } catch (Exception e) {
            return List.of();
        }
    }

    public Map<String, Object> getUserSessionSummary() {
        List<Map<String, Object>> locations = getAllLocations();
        List<Map<String, Object>> activities = getAllActivities();

        Map<String, List<Map<String, Object>>> byUser = locations.stream()
            .collect(Collectors.groupingBy(
                l -> (String) l.getOrDefault("userId", "anonymous"),
                Collectors.toList()
            ));

        List<Map<String, Object>> userSummaries = new ArrayList<>();
        for (var entry : byUser.entrySet()) {
            List<Map<String, Object>> userLocations = entry.getValue();
            Map<String, Object> lastLoc = userLocations.get(userLocations.size() - 1);
            userSummaries.add(Map.of(
                "userId", entry.getKey(),
                "ip", lastLoc.getOrDefault("ip", "Unknown"),
                "lastLocation", lastLoc.getOrDefault("city", "Unknown") + ", " + lastLoc.getOrDefault("country", "Unknown"),
                "latitude", lastLoc.getOrDefault("latitude", 0.0),
                "longitude", lastLoc.getOrDefault("longitude", 0.0),
                "browser", lastLoc.getOrDefault("browser", "Unknown"),
                "os", lastLoc.getOrDefault("os", "Unknown"),
                "device", lastLoc.getOrDefault("device", "Unknown"),
                "lastSeen", lastLoc.getOrDefault("timestamp", "Unknown"),
                "locationCount", userLocations.size()
            ));
        }

        return Map.of(
            "totalUsers", byUser.size(),
            "totalLocations", locations.size(),
            "totalActivities", activities.size(),
            "users", userSummaries,
            "recentActivities", activities.size() > 50 ? activities.subList(activities.size() - 50, activities.size()) : activities
        );
    }

    public Map<String, Object> clearTrackingData() {
        try {
            Path locationsFile = trackingPath.resolve(LOCATIONS_FILE);
            Path activityFile = trackingPath.resolve(ACTIVITY_FILE);
            Files.deleteIfExists(locationsFile);
            Files.deleteIfExists(activityFile);
            return Map.of("status", "cleared");
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }
}
