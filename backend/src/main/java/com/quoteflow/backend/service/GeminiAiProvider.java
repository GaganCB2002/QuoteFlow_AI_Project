package com.quoteflow.backend.service;

import com.quoteflow.backend.config.AiConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GeminiAiProvider implements AiProvider {

    private final RestTemplate restTemplate;
    private final AiConfig aiConfig;

    @Override
    public String analyze(String systemPrompt, String userMessage) {
        String url = aiConfig.getEndpoint() + "?key=" + aiConfig.getApiKey();

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("role", "user", "parts", List.of(
                    Map.of("text", systemPrompt + "\n\n" + userMessage)
                ))
            ),
            "generationConfig", Map.of(
                "maxOutputTokens", aiConfig.getMaxTokens(),
                "temperature", aiConfig.getTemperature()
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (!parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
            throw new RuntimeException("No response from Gemini AI provider");
        } catch (Exception e) {
            throw new RuntimeException("Failed to call Gemini AI provider: " + e.getMessage(), e);
        }
    }
}
