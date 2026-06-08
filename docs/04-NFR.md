# Non-Functional Requirement Document (NFR)

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Performance Requirements

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-PERF-01 | API response time (p95) | < 2 seconds | New Relic / custom monitoring |
| NFR-PERF-02 | API response time (average) | < 500 ms | New Relic / custom monitoring |
| NFR-PERF-03 | PDF generation time | < 3 seconds | Server-side timing logs |
| NFR-PERF-04 | AI quotation generation | < 5 seconds | API timing |
| NFR-PERF-05 | Offline data sync | < 10 seconds for 100 records | Client-side timing |
| NFR-PERF-06 | Search results retrieval | < 500 ms | Query execution logs |
| NFR-PERF-07 | Voice-to-quotation conversion | < 3 seconds | Speech processing timing |
| NFR-PERF-08 | Concurrent API requests per server | 1000+ | Load testing (JMeter) |
| NFR-PERF-09 | Database query time (p95) | < 500 ms | PostgreSQL slow query log |
| NFR-PERF-10 | WhatsApp share trigger | < 2 seconds | Client-side timing |

---

## 2. Security Requirements

| ID | Requirement | Implementation |
|----|-------------|---------------|
| NFR-SEC-01 | Data encryption at rest | AES-256 |
| NFR-SEC-02 | Data encryption in transit | TLS 1.3 / HTTPS only |
| NFR-SEC-03 | Authentication mechanism | JWT with RS256 |
| NFR-SEC-04 | Token expiry | 24 hours (configurable) |
| NFR-SEC-05 | Password storage | BCrypt hashing |
| NFR-SEC-06 | API rate limiting | 100 requests/minute per user |
| NFR-SEC-07 | SQL injection prevention | Parameterized queries / JPA |
| NFR-SEC-08 | XSS prevention | Input sanitization, CSP headers |
| NFR-SEC-09 | CSRF protection | CSRF tokens for Web |
| NFR-SEC-10 | Offline data encryption | Encrypted local storage (SQLCipher) |
| NFR-SEC-11 | Audit logging | All user actions logged |
| NFR-SEC-12 | File upload validation | Type, size, malware scanning |

---

## 3. Availability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AVAIL-01 | System uptime | 99.9% (excluding planned maintenance) |
| NFR-AVAIL-02 | Maximum allowed downtime per month | 43 minutes |
| NFR-AVAIL-03 | Planned maintenance window | Sunday 02:00-04:00 IST |
| NFR-AVAIL-04 | Offline mode availability | 100% (no server dependency) |
| NFR-AVAIL-05 | Database failover time | < 60 seconds |
| NFR-AVAIL-06 | Disaster recovery time (RTO) | < 4 hours |
| NFR-AVAIL-07 | Data loss tolerance (RPO) | < 15 minutes |

---

## 4. Scalability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-SCAL-01 | Maximum supported users | 100,000 |
| NFR-SCAL-02 | Maximum concurrent users | 10,000 |
| NFR-SCAL-03 | Horizontal scaling | Auto-scaling groups (AWS) |
| NFR-SCAL-04 | Database scaling | Read replicas for reporting |
| NFR-SCAL-05 | AI API scaling | Queue-based processing |
| NFR-SCAL-06 | Cache layer | Redis cluster for session & data |

---

## 5. Offline & Sync Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-OFF-01 | Local storage capacity | Support 10,000+ records offline |
| NFR-OFF-02 | Sync mechanism | CRDT-based conflict resolution |
| NFR-OFF-03 | Sync trigger | Auto-sync on app foreground + periodic (5 min) |
| NFR-OFF-04 | Bandwidth efficiency | Delta sync (only changed records) |
| NFR-OFF-05 | Conflict resolution | Last-writer-wins with audit log |
| NFR-OFF-06 | Sync feedback | Visual indicator: synced / pending / error |

---

## 6. Reliability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-REL-01 | Mean Time Between Failures (MTBF) | > 720 hours (30 days) |
| NFR-REL-02 | Mean Time To Recover (MTTR) | < 30 minutes |
| NFR-REL-03 | Error rate (API) | < 0.1% of all requests |
| NFR-REL-04 | PDF generation success rate | > 99.5% |
| NFR-REL-05 | AI suggestion accuracy | > 90% |

---

## 7. Usability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-USAB-01 | User onboarding time (first quotation) | < 60 seconds |
| NFR-USAB-02 | Learning curve for basic tasks | < 15 minutes |
| NFR-USAB-03 | UI responsiveness | All actions provide feedback within 1 second |
| NFR-USAB-04 | Voice input accuracy | > 95% speech-to-text accuracy |
| NFR-USAB-05 | Accessibility | WCAG 2.1 AA compliance |
| NFR-USAB-06 | Multi-language support (future) | English, Hindi, Kannada, Tamil, Telugu |

---

## 8. Compatibility Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-COMP-01 | Android OS versions | API 24+ (Android 7.0+) |
| NFR-COMP-02 | Web browsers | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| NFR-COMP-03 | PDF viewers | Standard PDF readers |
| NFR-COMP-04 | WhatsApp integration | WhatsApp Business API + Intent |
| NFR-COMP-05 | AI providers | OpenAI API + Gemini API |

---

## 9. Maintainability Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-MAINT-01 | Code coverage | > 80% unit test coverage |
| NFR-MAINT-02 | API documentation | OpenAPI/Swagger spec available |
| NFR-MAINT-03 | Logging | Structured logging (JSON format) |
| NFR-MAINT-04 | Monitoring | Prometheus + Grafana dashboards |
| NFR-MAINT-05 | Alerting | PagerDuty integration for critical alerts |
| NFR-MAINT-06 | CI/CD pipeline | GitHub Actions for automated build/test/deploy |

---

## 10. Legal & Compliance Requirements

| ID | Requirement | Compliance |
|----|-------------|------------|
| NFR-LEGAL-01 | GDPR compliance | Data export, deletion, consent |
| NFR-LEGAL-02 | Indian IT Act compliance | Data localization, cyber security |
| NFR-LEGAL-03 | GST compliance | Accurate tax calculation, invoice format |
| NFR-LEGAL-04 | Data retention policy | 8 years as per Indian tax law |
| NFR-LEGAL-05 | AI model compliance | Transparent AI, opt-out option |
| NFR-LEGAL-06 | Copyright | All code and content owned by company |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
