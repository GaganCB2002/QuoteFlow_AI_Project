package com.quoteflow.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class SelfLearningService {

    private static final String LEARNING_DIR = "self-learning";
    private static final String MODEL_FILE = "trained-model.json";
    private static final String PATTERNS_FILE = "learned-patterns.json";
    private static final String CORRECTIONS_FILE = "corrections.json";

    private final Path learningPath;
    private final ObjectMapper mapper;

    private final Map<String, TrainedPattern> patterns = new ConcurrentHashMap<>();
    private final List<CorrectionRecord> corrections = new ArrayList<>();
    private long totalPredictions = 0;
    private long accuratePredictions = 0;

    public SelfLearningService() {
        this.learningPath = Paths.get(System.getProperty("user.dir"), LEARNING_DIR);
        this.mapper = new ObjectMapper();
        mapper.enable(com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT);
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(learningPath);
            loadModel();
            loadPatterns();
            loadCorrections();
        } catch (Exception e) {
            // Init OK
        }
    }

    public Map<String, Object> predictPrice(String projectType, String description) {
        totalPredictions++;
        String key = normalizeKey(projectType, description);

        TrainedPattern pattern = patterns.get(key);
        if (pattern != null) {
            accuratePredictions++;
            return Map.of(
                "predicted", true,
                "fromPattern", true,
                "confidence", String.format("%.0f%%", pattern.confidence * 100),
                "minPrice", pattern.minPrice,
                "maxPrice", pattern.maxPrice,
                "midPrice", (pattern.minPrice + pattern.maxPrice) / 2,
                "patternMatches", pattern.matchCount,
                "lastLearned", pattern.lastUpdated
            );
        }

        TrainedPattern similar = findSimilarPattern(key);
        if (similar != null) {
            accuratePredictions++;
            return Map.of(
                "predicted", true,
                "fromPattern", true,
                "similarity", "partial",
                "confidence", String.format("%.0f%%", similar.confidence * 80),
                "minPrice", similar.minPrice,
                "maxPrice", similar.maxPrice,
                "midPrice", (similar.minPrice + similar.maxPrice) / 2,
                "patternMatches", similar.matchCount
            );
        }

        return Map.of("predicted", false, "confidence", "0%");
    }

    public void learn(String projectType, String description, int actualMinPrice, int actualMaxPrice, boolean accurate) {
        String key = normalizeKey(projectType, description);

        TrainedPattern existing = patterns.get(key);
        if (existing != null) {
            int avgMin = (existing.minPrice + actualMinPrice) / 2;
            int avgMax = (existing.maxPrice + actualMaxPrice) / 2;
            double newConf = Math.min(0.99, existing.confidence + 0.05);
            patterns.put(key, new TrainedPattern(
                projectType, description, avgMin, avgMax,
                existing.matchCount + 1, newConf, LocalDateTime.now().toString()
            ));
        } else {
            patterns.put(key, new TrainedPattern(
                projectType, description, actualMinPrice, actualMaxPrice,
                1, 0.5, LocalDateTime.now().toString()
            ));
        }

        if (!accurate) {
            corrections.add(new CorrectionRecord(
                projectType, description, actualMinPrice, actualMaxPrice,
                LocalDateTime.now().toString()
            ));
            if (corrections.size() > 1000) {
                corrections.remove(0);
            }
        }

        saveModel();
    }

    public void trainFromCorrection(String projectType, String description, int correctMin, int correctMax) {
        String key = normalizeKey(projectType, description);
        patterns.put(key, new TrainedPattern(
            projectType, description, correctMin, correctMax,
            5, 0.9, LocalDateTime.now().toString()
        ));
        saveModel();
    }

    public Map<String, Object> getModelStats() {
        long totalCorrected = corrections.stream()
            .filter(c -> c.projectType != null)
            .count();

        return Map.of(
            "totalPatterns", patterns.size(),
            "totalPredictions", totalPredictions,
            "accuratePredictions", accuratePredictions,
            "accuracyRate", totalPredictions > 0
                ? String.format("%.1f%%", (accuratePredictions * 100.0 / totalPredictions))
                : "0%",
            "totalCorrections", corrections.size(),
            "totalCorrected", totalCorrected,
            "modelVersion", "v2.0"
        );
    }

    public List<Map<String, Object>> getPatterns() {
        return patterns.entrySet().stream().map(e -> {
            TrainedPattern p = e.getValue();
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("key", e.getKey());
            map.put("projectType", p.projectType);
            map.put("description", p.description);
            map.put("minPrice", p.minPrice);
            map.put("maxPrice", p.maxPrice);
            map.put("matchCount", p.matchCount);
            map.put("confidence", String.format("%.0f%%", p.confidence * 100));
            map.put("lastUpdated", p.lastUpdated);
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getCorrections() {
        return corrections.stream().map(c -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("projectType", c.projectType);
            map.put("description", c.description);
            map.put("correctMinPrice", c.correctMinPrice);
            map.put("correctMaxPrice", c.correctMaxPrice);
            map.put("timestamp", c.timestamp);
            return map;
        }).collect(Collectors.toList());
    }

    public void resetModel() {
        patterns.clear();
        corrections.clear();
        totalPredictions = 0;
        accuratePredictions = 0;
        saveModel();
        saveCorrections();
    }

    private String normalizeKey(String projectType, String description) {
        String desc = description != null ? description.toLowerCase().replaceAll("[^a-z0-9\\s]", "").trim() : "";
        String shortDesc = desc.length() > 100 ? desc.substring(0, 100) : desc;
        String[] words = shortDesc.split("\\s+");
        Set<String> important = new LinkedHashSet<>();
        for (String w : words) {
            if (w.length() > 2) important.add(w);
        }
        return projectType + "::" + String.join("_", important);
    }

    private TrainedPattern findSimilarPattern(String key) {
        String[] parts = key.split("::");
        String projectType = parts.length > 0 ? parts[0] : "";
        String descPart = parts.length > 1 ? parts[1] : "";

        for (var entry : patterns.entrySet()) {
            String existingKey = entry.getKey();
            if (existingKey.startsWith(projectType + "::")) {
                String existingDesc = existingKey.substring(projectType.length() + 2);
                long commonWords = Arrays.stream(descPart.split("_"))
                    .filter(existingDesc::contains)
                    .count();
                if (commonWords >= 2) {
                    return entry.getValue();
                }
            }
        }
        return null;
    }

    private void saveModel() {
        try {
            Path file = learningPath.resolve(MODEL_FILE);
            List<Map<String, Object>> data = getPatterns();
            mapper.writerWithDefaultPrettyPrinter().writeValue(file.toFile(), data);
        } catch (Exception ignored) {}
    }

    private void saveCorrections() {
        try {
            Path file = learningPath.resolve(CORRECTIONS_FILE);
            mapper.writerWithDefaultPrettyPrinter().writeValue(file.toFile(), getCorrections());
        } catch (Exception ignored) {}
    }

    @SuppressWarnings("unchecked")
    private void loadModel() {
        try {
            Path file = learningPath.resolve(MODEL_FILE);
            if (Files.exists(file)) {
                String content = Files.readString(file);
                List<Map<String, Object>> data = mapper.readValue(content, new TypeReference<List<Map<String, Object>>>() {});
                for (Map<String, Object> entry : data) {
                    TrainedPattern p = new TrainedPattern(
                        (String) entry.get("projectType"),
                        (String) entry.get("description"),
                        (int) entry.getOrDefault("minPrice", 0),
                        (int) entry.getOrDefault("maxPrice", 0),
                        (int) entry.getOrDefault("matchCount", 1),
                        parseConfidence((String) entry.get("confidence")),
                        (String) entry.getOrDefault("lastUpdated", LocalDateTime.now().toString())
                    );
                    patterns.put((String) entry.get("key"), p);
                }
            }
        } catch (Exception ignored) {}
    }

    @SuppressWarnings("unchecked")
    private void loadPatterns() {
        try {
            Path file = learningPath.resolve(PATTERNS_FILE);
            if (Files.exists(file)) {
                String content = Files.readString(file);
                List<Map<String, Object>> data = mapper.readValue(content, new TypeReference<List<Map<String, Object>>>() {});
                for (Map<String, Object> entry : data) {
                    TrainedPattern p = new TrainedPattern(
                        (String) entry.get("projectType"),
                        (String) entry.get("description"),
                        (int) entry.getOrDefault("minPrice", 0),
                        (int) entry.getOrDefault("maxPrice", 0),
                        (int) entry.getOrDefault("matchCount", 1),
                        parseConfidence((String) entry.get("confidence")),
                        (String) entry.getOrDefault("lastUpdated", LocalDateTime.now().toString())
                    );
                    patterns.put((String) entry.get("key"), p);
                }
            }
        } catch (Exception ignored) {}
    }

    @SuppressWarnings("unchecked")
    private void loadCorrections() {
        try {
            Path file = learningPath.resolve(CORRECTIONS_FILE);
            if (Files.exists(file)) {
                String content = Files.readString(file);
                List<Map<String, Object>> data = mapper.readValue(content, new TypeReference<List<Map<String, Object>>>() {});
                for (Map<String, Object> entry : data) {
                    corrections.add(new CorrectionRecord(
                        (String) entry.get("projectType"),
                        (String) entry.get("description"),
                        (int) entry.getOrDefault("correctMinPrice", 0),
                        (int) entry.getOrDefault("correctMaxPrice", 0),
                        (String) entry.getOrDefault("timestamp", LocalDateTime.now().toString())
                    ));
                }
            }
        } catch (Exception ignored) {}
    }

    private double parseConfidence(String conf) {
        if (conf == null) return 0.5;
        try {
            return Double.parseDouble(conf.replace("%", "")) / 100.0;
        } catch (NumberFormatException e) {
            return 0.5;
        }
    }

    private record TrainedPattern(
        String projectType, String description,
        int minPrice, int maxPrice,
        int matchCount, double confidence, String lastUpdated
    ) {
        TrainedPattern {
            // Compact record
        }
    }

    private record CorrectionRecord(
        String projectType, String description,
        int correctMinPrice, int correctMaxPrice,
        String timestamp
    ) {
        CorrectionRecord {
            // Compact record
        }
    }
}
