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
public class OpenAiProvider implements AiProvider {

    private final RestTemplate restTemplate;
    private final AiConfig aiConfig;

    @Override
    public String analyze(String systemPrompt, String userMessage) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(aiConfig.getApiKey());

        Map<String, Object> requestBody = Map.of(
            "model", aiConfig.getModel(),
            "messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userMessage)
            ),
            "max_tokens", aiConfig.getMaxTokens(),
            "temperature", aiConfig.getTemperature()
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                aiConfig.getEndpoint(), request, Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
            throw new RuntimeException("No response from AI provider");
        } catch (Exception e) {
            throw new RuntimeException("Failed to call AI provider: " + e.getMessage(), e);
        }
    }
}
