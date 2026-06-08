# Software Design Document (SDD)

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Mobile App (Flutter / React Native)        │
│              Offline-First │ Local SQLite │ Auto-Sync         │
└────────────────────┬────────────────────────────────────────┘
                      │ HTTPS / REST + WebSocket
┌─────────────────────┼───────────────────────────────────────┐
│                  API Gateway (Spring Cloud Gateway)           │
│         Load Balancing │ Rate Limiting │ Auth Filter          │
└─────────────────────┼───────────────────────────────────────┘
                      │
┌─────────────────────┼───────────────────────────────────────┐
│                  Web App (React / Angular)                    │
└─────────────────────┼───────────────────────────────────────┘
                      │
┌──────────────────────┴──────────────────────────────────────┐
│                    Microservices Layer                         │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Auth   │  │   CRM    │  │  Billing │  │   AI     │      │
│  │ Service  │  │ Service  │  │  Service │  │ Service  │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Marketing │  │ Company  │  │Analytics │  │  Media   │      │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │   Sync   │  │    AI    │  │   AI     │                    │
│  │ Service  │  │ Proposal │  │ Pricing  │                    │
│  └────┬─────┘  └──────────┘  └──────────┘                    │
└───────┼─────────────────────────────────────────────────────┘
        │
┌───────┴─────────────────────────────────────────────────────┐
│                    Data Layer                                 │
│                                                               │
│  ┌──────────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   PostgreSQL 16   │  │   Redis 7    │  │   AWS S3     │   │
│  │  (Primary DB)     │  │   (Cache)    │  │  (Storage)   │   │
│  └──────────────────┘  └──────────────┘  └──────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  AI API Layer (OpenAI + Gemini)                         │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### 1.2 Component Diagram

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| Mobile App | Flutter / React Native | Cross-platform mobile application |
| Web App | React / Angular | Web-based interface |
| API Gateway | Spring Cloud Gateway | Routing, rate limiting, auth filtering |
| Auth Service | Spring Boot 4.0.6 | User authentication, JWT, OAuth (Google) |
| CRM Service | Spring Boot 4.0.6 | Customer & lead management, credit scoring |
| Billing Service | Spring Boot 4.0.6 | Quotations, invoices, receipts, PDF |
| AI Service | Spring Boot + Python | AI quotation, profit optimizer, proposals |
| AI Pricing Service | Python (FastAPI) | Competitor price intelligence |
| Marketing Service | Spring Boot 4.0.6 | WhatsApp/Email/SMS campaigns |
| Company Service | Spring Boot 4.0.6 | Company profiles and settings |
| Analytics Service | Spring Boot 4.0.6 | Reports and dashboards |
| Media Service | Spring Boot 4.0.6 | File uploads, PDF generation |
| Sync Service | Spring Boot 4.0.6 | Offline data sync & conflict resolution |

---

## 2. Design Patterns

### 2.1 Repository Pattern

```
UserRepository extends JpaRepository<User, UUID>
CustomerRepository extends JpaRepository<Customer, UUID>
QuotationRepository extends JpaRepository<Quotation, UUID>
```

### 2.2 Service Layer Pattern

```
Controller → Service → Repository
```

### 2.3 Factory Pattern

```
DocumentFactory.createDocument(DocumentType.QUOTATION)
DocumentFactory.createDocument(DocumentType.INVOICE)
DocumentFactory.createDocument(DocumentType.PROFORMA_INVOICE)
DocumentFactory.createDocument(DocumentType.RECEIPT)
DocumentFactory.createDocument(DocumentType.ADVANCE_RECEIPT)
```

### 2.4 Builder Pattern

```
QuotationPDFBuilder builder = new QuotationPDFBuilder()
builder.setCompany(company)
builder.setItems(items)
builder.setGST(gstDetails)
builder.setSignature(signature)
builder.setQRCode(qrCode)
PDFDocument pdf = builder.build()
```

### 2.5 Strategy Pattern

```
TaxCalculationContext context = new TaxCalculationContext()
context.setStrategy(new IntraStateTaxStrategy())
BigDecimal tax = context.calculate(amount)
```

### 2.6 Observer Pattern

```
QuotationCreatedEvent → EmailService.sendNotification()
QuotationCreatedEvent → AnalyticsService.updateMetrics()
QuotationCreatedEvent → FollowUpEngine.scheduleReminder()
```

### 2.7 CQRS Pattern (Offline Sync)

```
Command: Local write to SQLite
Query: Read from local cache
Sync: Background service reconciles with server
```

### 2.8 CRDT Pattern (Conflict Resolution)

```
Last-Writer-Wins (LWW) for simple conflicts
CRDT-based merge for complex concurrent edits
```

---

## 3. AI Integration Architecture

### 3.1 AI Quotation Generator

```
User Input: "Website Development"
       ↓
API Gateway → AI Service
       ↓
Prompt Engineering Layer
  → "Generate quotation for Website Development
     including scope, pricing, timeline, deliverables"
       ↓
OpenAI API / Gemini API
       ↓
Response Parsing
  → Extract items, pricing, timeline
       ↓
Structured JSON → Pre-fill Quotation Form
       ↓
User Reviews & Edits → Save
```

### 3.2 AI Profit Optimizer

```
User Input: Cost = ₹40,000
       ↓
Analyze historical data for similar items
       ↓
Fetch market pricing (competitor intelligence)
       ↓
AI Calculation:
  Recommended Selling = ₹58,000
  Profit = ₹18,000 (31% margin)
  Max Discount = ₹5,000
  Minimum Selling = ₹53,000
       ↓
Display to user with confidence score
```

---

## 4. Offline Architecture

### 4.1 Offline Storage

```
Mobile Device:
  ┌─────────────────────────────────┐
  │  Local Database (SQLCipher)      │
  │  ├── Customers (cached)          │
  │  ├── Quotations (pending/pushed) │
  │  ├── Invoices (pending/pushed)   │
  │  ├── Receipts (pending/pushed)   │
  │  └── Sync Queue                  │
  └─────────────────────────────────┘
```

### 4.2 Sync Flow

```
App Launch → Check Connectivity
  ├── Online → Sync pending changes → Load fresh data
  └── Offline → Load from local cache → Enable offline mode

When Connectivity Restored:
  → Sync Service queues pending changes
  → Send changes to server
  → Server resolves conflicts (CRDT/LWW)
  → Return server response
  → Update local sync status
  → Show sync summary to user
```

---

## 5. Technology Stack

| Layer | Technology |
|-------|------------|
| Mobile Framework | Flutter (primary) OR React Native |
| Backend Framework | Spring Boot 4.0.6 |
| Language | Java 21 + Python (AI microservices) |
| Database | PostgreSQL 16 |
| Mobile Local DB | SQLCipher (encrypted SQLite) |
| Cache | Redis 7 |
| Object Storage | AWS S3 |
| Authentication | JWT (jjwt 0.12.5) + Google OAuth |
| PDF Generation | PDFBox / iText |
| AI APIs | OpenAI API + Gemini API |
| Email Service | AWS SES |
| SMS Service | AWS SNS |
| WhatsApp | WhatsApp Business API |
| Push Notifications | Firebase Cloud Messaging |
| Monitoring | Prometheus + Grafana |
| CI/CD | GitHub Actions |
| Container | Docker |
| Orchestration | AWS ECS / Kubernetes |
| Speech-to-Text | Google Speech API / Whisper |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
