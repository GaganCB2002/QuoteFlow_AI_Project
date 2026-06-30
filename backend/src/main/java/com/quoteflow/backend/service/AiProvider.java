package com.quoteflow.backend.service;

public interface AiProvider {
    String analyze(String systemPrompt, String userMessage);
}
