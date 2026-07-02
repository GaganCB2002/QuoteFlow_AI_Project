# 🛠️ Post 3 — Tech Stack Reveal

> **Best time to post:** Friday, 9:00–10:00 AM IST
> **Attach images:** `02_features_section.png`

---

## LinkedIn Post (Copy & Paste)

🛠️ **The tech stack behind QuoteFlow AI — and why I chose every piece**

Building a production-grade SaaS for Indian SMBs meant making deliberate technology choices. Here's the full stack and the reasoning:

**🖥️ Backend — Java 21 + Spring Boot 4.0.6**
→ Why: Virtual threads, pattern matching, records — Java 21 is a game-changer
→ Spring Boot 4.x with Spring Framework 7.x brings auto-configuration and Actuator for production monitoring
→ 25+ REST controllers, 31 service classes handling everything from AI to payments

**⚛️ Frontend — React 19 + TypeScript + Vite**
→ Why: Type safety catches bugs at compile time, not in production
→ 25 page components, custom hooks, context-based state management
→ TailwindCSS for rapid, consistent UI development

**🗄️ Database — PostgreSQL 16**
→ Why: ACID compliance, JSONB for flexible AI response storage, full-text search
→ Flyway migrations for version-controlled schema management
→ 27 entity models covering quotations, invoices, customers, deals, campaigns, and more

**⚡ Caching — Redis 7**
→ Why: In-memory session management, rate limiting, and response caching
→ Sub-millisecond read times for dashboard analytics

**🤖 Dual AI — OpenAI + Google Gemini**
→ Why: Redundancy and specialization
→ OpenAI for natural language quotation parsing
→ Gemini for market research and cost analysis
→ Factory pattern for seamless provider switching

**🔐 Security Layer**
→ JWT stateless authentication with token refresh
→ OAuth2 (Google login) with custom success handler
→ AES-256 encryption for sensitive data at rest
→ Rate limiting filter to prevent abuse
→ BCrypt password hashing + HMAC integrity checks

**📱 Mobile — Flutter (via Capacitor)**
→ Full feature parity on Android & iOS
→ Single codebase, native performance

**📊 Key Architecture Decisions:**
• Service-oriented architecture with clean separation of concerns
• DTO pattern for API responses (never expose entities directly)
• Approval workflows with audit logging
• Self-learning engine that improves estimates over time
• Market research service with web search integration

**Numbers that matter:**
→ 25 controllers • 31 services • 27 entities
→ 12+ feature modules • Dual AI providers
→ JWT + OAuth2 + 2FA + Encryption

The entire codebase is built to scale. Every decision was made with production in mind.

What tech stack questions do you have? I'm happy to deep dive into any part 👇

---

#TechStack #Java #Java21 #SpringBoot #React #TypeScript #PostgreSQL #Redis #OpenAI #GeminiAI #JWT #OAuth2 #Flutter #FullStackDeveloper #SystemDesign #SoftwareArchitecture #BuildInPublic #SaaS #IndianStartup
