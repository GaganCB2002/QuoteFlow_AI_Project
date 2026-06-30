package com.quoteflow.backend.service;

import com.quoteflow.backend.config.AiConfig;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AiServiceFactory {

    private final AiConfig aiConfig;
    private final OpenAiProvider openAiProvider;
    private final GeminiAiProvider geminiAiProvider;
    private final EstimationService estimationService;

    private AiProvider provider;

    @PostConstruct
    public void init() {
        switch (aiConfig.getProvider().toLowerCase()) {
            case "gemini" -> provider = geminiAiProvider;
            default -> provider = openAiProvider;
        }
    }

    public AiProvider getProvider() {
        return provider;
    }

    public boolean isAiEnabled() {
        return aiConfig.isEnabled() && aiConfig.getApiKey() != null && !aiConfig.getApiKey().isEmpty();
    }

    public EstimationService getEstimationService() {
        return estimationService;
    }
}
