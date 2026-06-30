package com.quoteflow.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

@Service
public class LocalFileStorageService {

    private static final Path REPORTS_ROOT = Paths.get("reports");
    private final ObjectMapper objectMapper;

    public LocalFileStorageService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(REPORTS_ROOT);
        } catch (IOException e) {
            throw new RuntimeException("Failed to create reports root directory", e);
        }
    }

    public QuotationFileSet saveQuotation(String projectType, String projectName,
                                           String companyName, String quoteNo,
                                           Map<String, Object> quotationData,
                                           Map<String, Object> marketResearch,
                                           List<Map<String, Object>> items) {
        try {
            String safeProjectType = sanitize(projectType != null ? projectType : "General");
            String safeProjectName = sanitize(projectName != null ? projectName : "Project");
            String safeCompanyName = sanitize(companyName != null ? companyName : "Client");
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HHmmss"));

            Path folderPath = REPORTS_ROOT
                .resolve(safeProjectType)
                .resolve(safeProjectName)
                .resolve(safeCompanyName)
                .resolve(timestamp + "_" + quoteNo);

            Files.createDirectories(folderPath);

            saveJson(folderPath.resolve("quotation.json"), quotationData);
            saveJson(folderPath.resolve("items.json"), items);
            saveJson(folderPath.resolve("market-research.json"), marketResearch);
            saveJson(folderPath.resolve("cost-breakdown.json"), quotationData.get("costBreakdown"));

            Map<String, Object> meta = new LinkedHashMap<>();
            meta.put("quoteNo", quoteNo);
            meta.put("projectType", projectType);
            meta.put("projectName", projectName);
            meta.put("companyName", companyName);
            meta.put("createdAt", LocalDateTime.now().toString());
            meta.put("folderPath", folderPath.toString());
            meta.put("files", List.of(
                "quotation.json", "items.json", "market-research.json", "cost-breakdown.json"
            ));
            saveJson(folderPath.resolve("metadata.json"), meta);

            return new QuotationFileSet(
                quoteNo, folderPath.toString(),
                List.of("quotation.json", "items.json", "market-research.json", "cost-breakdown.json", "metadata.json"),
                meta
            );
        } catch (IOException e) {
            throw new RuntimeException("Failed to save quotation files: " + e.getMessage(), e);
        }
    }

    public List<QuotationSummary> listAllQuotations() {
        List<QuotationSummary> result = new ArrayList<>();
        try {
            if (!Files.exists(REPORTS_ROOT)) return result;

            try (Stream<Path> typeDirs = Files.list(REPORTS_ROOT)) {
                typeDirs.filter(Files::isDirectory).forEach(typeDir -> {
                    try (Stream<Path> projectDirs = Files.list(typeDir)) {
                        projectDirs.filter(Files::isDirectory).forEach(projectDir -> {
                            try (Stream<Path> companyDirs = Files.list(projectDir)) {
                                companyDirs.filter(Files::isDirectory).forEach(companyDir -> {
                                    try (Stream<Path> quoteDirs = Files.list(companyDir)) {
                                        quoteDirs.filter(Files::isDirectory).forEach(quoteDir -> {
                                            Path metaFile = quoteDir.resolve("metadata.json");
                                            if (Files.exists(metaFile)) {
                                                try {
                                                    Map<String, Object> meta = objectMapper.readValue(
                                                        metaFile.toFile(), Map.class);
                                                    result.add(new QuotationSummary(
                                                        (String) meta.get("quoteNo"),
                                                        (String) meta.get("projectType"),
                                                        (String) meta.get("projectName"),
                                                        (String) meta.get("companyName"),
                                                        (String) meta.get("createdAt"),
                                                        quoteDir.toString()
                                                    ));
                                                } catch (IOException ignored) {}
                                            }
                                        });
                                    } catch (IOException ignored) {}
                                });
                            } catch (IOException ignored) {}
                        });
                    } catch (IOException ignored) {}
                });
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to list quotations", e);
        }
        result.sort((a, b) -> b.createdAt().compareTo(a.createdAt()));
        return result;
    }

    public Map<String, Object> loadQuotation(String quoteNo) {
        try {
            try (Stream<Path> typeDirs = Files.list(REPORTS_ROOT)) {
                for (Path typeDir : (Iterable<Path>) typeDirs::iterator) {
                    if (!Files.isDirectory(typeDir)) continue;
                    try (Stream<Path> projectDirs = Files.list(typeDir)) {
                        for (Path projectDir : (Iterable<Path>) projectDirs::iterator) {
                            if (!Files.isDirectory(projectDir)) continue;
                            try (Stream<Path> companyDirs = Files.list(projectDir)) {
                                for (Path companyDir : (Iterable<Path>) companyDirs::iterator) {
                                    if (!Files.isDirectory(companyDir)) continue;
                                    try (Stream<Path> quoteDirs = Files.list(companyDir)) {
                                        for (Path quoteDir : (Iterable<Path>) quoteDirs::iterator) {
                                            if (!Files.isDirectory(quoteDir)) continue;
                                            if (quoteDir.getFileName().toString().contains(quoteNo)) {
                                                Map<String, Object> data = new LinkedHashMap<>();
                                                data.put("quotation", readJson(quoteDir.resolve("quotation.json")));
                                                data.put("items", readJson(quoteDir.resolve("items.json")));
                                                data.put("marketResearch", readJson(quoteDir.resolve("market-research.json")));
                                                data.put("costBreakdown", readJson(quoteDir.resolve("cost-breakdown.json")));
                                                data.put("metadata", readJson(quoteDir.resolve("metadata.json")));
                                                return data;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load quotation: " + quoteNo, e);
        }
        return null;
    }

    public Path getQuotationFolderPath(String quoteNo) {
        try {
            try (Stream<Path> typeDirs = Files.list(REPORTS_ROOT)) {
                for (Path typeDir : (Iterable<Path>) typeDirs::iterator) {
                    if (!Files.isDirectory(typeDir)) continue;
                    try (Stream<Path> projectDirs = Files.list(typeDir)) {
                        for (Path projectDir : (Iterable<Path>) projectDirs::iterator) {
                            if (!Files.isDirectory(projectDir)) continue;
                            try (Stream<Path> companyDirs = Files.list(projectDir)) {
                                for (Path companyDir : (Iterable<Path>) companyDirs::iterator) {
                                    if (!Files.isDirectory(companyDir)) continue;
                                    try (Stream<Path> quoteDirs = Files.list(companyDir)) {
                                        for (Path quoteDir : (Iterable<Path>) quoteDirs::iterator) {
                                            if (!Files.isDirectory(quoteDir)) continue;
                                            if (quoteDir.getFileName().toString().contains(quoteNo)) {
                                                return quoteDir;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (IOException ignored) {}
        return null;
    }

    private void saveJson(Path path, Object data) throws IOException {
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
        Files.writeString(path, json, StandardCharsets.UTF_8);
    }

    private Object readJson(Path path) {
        try {
            if (Files.exists(path)) {
                return objectMapper.readValue(path.toFile(), Map.class);
            }
        } catch (IOException ignored) {}
        return null;
    }

    private String sanitize(String input) {
        return input.replaceAll("[^a-zA-Z0-9\\-\\s]", "_").trim()
            .replaceAll("\\s+", "-").toLowerCase();
    }

    public record QuotationFileSet(
        String quoteNo,
        String folderPath,
        List<String> files,
        Map<String, Object> metadata
    ) {}

    public record QuotationSummary(
        String quoteNo,
        String projectType,
        String projectName,
        String companyName,
        String createdAt,
        String folderPath
    ) {}
}
