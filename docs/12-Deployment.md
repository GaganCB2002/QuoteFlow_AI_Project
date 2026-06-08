# Deployment Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Deployment Architecture

### 1.1 Environment Overview

| Environment | Purpose | URL |
|-------------|---------|-----|
| Development | Local development | http://localhost:8081 |
| Staging | Pre-production validation | https://staging-api.quoteflow.ai |
| Production | Live customer facing | https://api.quoteflow.ai |

### 1.2 AWS Infrastructure (Updated)

```
┌─────────────────────────────────────────────────────────────┐
│                        AWS Cloud                              │
│                                                               │
│  ALB → ECS Fargate (Auto-scaling)                             │
│    ├── Auth Service (Spring Boot)                             │
│    ├── Billing Service (Spring Boot)                          │
│    ├── CRM Service (Spring Boot)                              │
│    ├── Marketing Service (Spring Boot)                        │
│    ├── AI Service (Python FastAPI)                            │
│    ├── Sync Service (Spring Boot)                             │
│    └── Media Service (Spring Boot)                            │
│                                                               │
│  RDS PostgreSQL (Multi-AZ)                                    │
│  ElastiCache Redis                                            │
│  S3 (Logos, PDFs, Signatures, QR codes)                       │
│                                                               │
│  AI Layer:                                                    │
│    ├── OpenAI API (GPT-4 / GPT-4o-mini)                       │
│    └── Gemini API (Gemini 1.5 Pro)                            │
│                                                               │
│  WhatsApp: WhatsApp Business Cloud API                        │
│  Push: Firebase Cloud Messaging                               │
│  Speech: Google Speech-to-Text / Whisper                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. AI Service Deployment

### 2.1 AI Microservice (Python FastAPI)

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2.2 AI API Configuration

```yaml
# application.yml (Spring Boot config for AI service)
ai:
  provider: openai  # or gemini
  openai:
    api-key: ${OPENAI_API_KEY}
    model: gpt-4o-mini
    max-tokens: 2000
    temperature: 0.3
  gemini:
    api-key: ${GEMINI_API_KEY}
    model: gemini-1.5-pro
  fallback:
    enabled: true
    provider: gemini  # fallback if primary fails
  rate-limit:
    requests-per-minute: 60
    requests-per-day: 1000
```

---

## 3. Offline Sync Architecture

### 3.1 Sync Service

```yaml
sync:
  conflict-resolution: LAST_WRITER_WINS
  batch-size: 100
  retry:
    max-attempts: 3
    backoff-delay-ms: 1000
  pull-interval-seconds: 300
```

---

## 4. CI/CD Pipeline Updates

### 4.1 GitHub Actions (Updated)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: Run backend tests
        run: ./mvnw verify
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Run AI service tests
        run: |
          cd ai-service
          pip install -r requirements.txt
          pytest

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build & push backend Docker image
        run: |
          docker build -t quoteflow-backend:latest ./backend
          docker push ${ECR_REPO}/quoteflow-backend:latest
      - name: Build & push AI service Docker image
        run: |
          docker build -t quoteflow-ai:latest ./ai-service
          docker push ${ECR_REPO}/quoteflow-ai:latest
      - name: Update ECS services
        run: |
          aws ecs update-service --cluster quoteflow-prod --service backend-service --force-new-deployment
          aws ecs update-service --cluster quoteflow-prod --service ai-service --force-new-deployment
```

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
