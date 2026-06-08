# QuoteFlow AI Documentation

## Next-Generation Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0 — Enhanced with AI, Offline, Voice, WhatsApp Marketing

---

### Document Index

| # | Document | Filename | Description |
|---|----------|----------|-------------|
| 1 | Business Requirement Document | `01-BRD.md` | Problem statement, USP (AI, voice, e-sign, QR), target market, revenue model |
| 2 | Software Requirement Specification | `02-SRS.md` | System features, AI module, offline mode, edge cases, behavioral constraints |
| 3 | Functional Requirement Document | `03-FRD.md` | 122 requirements across 13 modules including AI, voice, offline |
| 4 | Non-Functional Requirement Document | `04-NFR.md` | Performance, security, offline sync, AI accuracy, scalability |
| 5 | Software Design Document | `05-SDD.md` | Architecture, AI integration, offline sync, design patterns, tech stack |
| 6 | Database Design Document | `06-Database-Design.md` | ERD, 12+ tables, credit score logic, new tables (competitor_prices, sync_queue) |
| 7 | API Documentation | `07-API-Documentation.md` | REST endpoints — AI, voice, WhatsApp, e-signature, QR, Google Auth |
| 8 | User Story Document | `08-User-Stories.md` | 30 stories across all roles including AI, offline, voice, marketing |
| 9 | Test Case Document | `09-Test-Cases.md` | 50+ test cases including AI generation, offline sync, voice, QR |
| 10 | Security Test Cases | `10-Security-Test-Cases.md` | 44 security tests — token, injection, AI API security, offline data |
| 11 | UAT Test Cases | `11-UAT-Test-Cases.md` | End-to-end workflows with AI, marketing, offline scenarios |
| 12 | Deployment Document | `12-Deployment.md` | Docker, AWS ECS, CI/CD, AI API deployment, offline sync architecture |
| 13 | Project Timeline | `13-Project-Timeline.md` | 6-month phased roadmap (Core → Billing → CRM → Marketing → AI → Analytics) |
| 14 | User Manual | `14-User-Manual.md` | End-user guide — AI generator, voice, profit optimizer, offline, QR |
| 15 | Admin Manual | `15-Admin-Manual.md` | Super admin & company admin — users, billing, AI config, monitoring |
| 16 | Risk Assessment | `16-Risk-Assessment.md` | 30+ risks — AI accuracy, offline sync conflicts, API dependency |
| 17 | GST Compliance | `17-GST-Compliance.md` | GST rules, invoice formats, HSN/SAC, proforma invoice, e-invoicing roadmap |
| 18 | Backup & Disaster Recovery | `18-Backup-Disaster-Recovery.md` | RTO/RPO, cross-region DR, offline data recovery, AI model backup |
| 19 | Security Audit Report | `19-Security-Audit-Report.md` | Findings, AI API security, offline encryption, recommendations |

### Unique Selling Points (USPs)

- **AI Quotation Generator** — Enter "Website" → AI generates scope, pricing, timeline
- **AI Profit Optimizer** — Cost ₹40K → AI suggests selling ₹58K, profit ₹18K
- **Voice Quotation** — Speak it, system creates it
- **One-Click Quote → Invoice** — Convert instantly
- **WhatsApp Business Integration** — One-click share, bulk campaigns
- **Smart Follow-Up Engine** — Auto-reminders to customers and sales team
- **AI Proposal Writer** — Software, digital marketing, AMC proposals
- **Customer Credit Score** — Based on payment history
- **Competitor Price Intelligence** — Store & compare pricing
- **E-Signature** — Digital signing on documents
- **QR Payment** — UPI QR codes and payment links
- **Offline Mode** — Work without internet, auto-sync

### Project Overview

| Aspect | Detail |
|--------|--------|
| **Mobile** | Flutter (cross-platform) |
| **Backend** | Spring Boot 4.0.6 / Java 21 + Python (AI) |
| **Database** | PostgreSQL 16 + Redis 7 + SQLCipher (mobile) |
| **AI** | OpenAI API + Gemini API |
| **Auth** | JWT + Google OAuth |
| **Storage** | AWS S3 |
| **Deployment** | Docker, AWS ECS, GitHub Actions CI/CD |
| **Revenue Model** | Free / Pro (₹499) / Business (₹999) / Enterprise (₹4,999) |

### Quick Links

- [Backend Source Code](../backend/)
- [Project Configuration](../.vscode/settings.json)
- [Backend Config](../backend/src/main/resources/application.yml)
