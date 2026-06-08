# Software Requirement Specification (SRS)

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Introduction

### 1.1 Purpose

QuoteFlow AI is a next-generation business management platform that enables businesses to create AI-powered quotations, manage GST-compliant billing, track customers and leads, run marketing campaigns, share documents via WhatsApp, and gain business insights — all from a single, unified platform accessible via Android and Web.

### 1.2 Product Scope

| Module | Description |
|--------|-------------|
| Quotation Management | AI-powered generation, custom items, GST, PDF, WhatsApp share, voice quotation |
| GST Billing | GST invoice, Tax invoice, Proforma invoice, QR payment |
| Receipt Generation | Payment receipt, Advance receipt, UPI QR code |
| CRM | Lead tracking, customer credit scoring, interaction log, follow-up engine |
| Marketing Automation | WhatsApp campaigns, Email/SMS, festival wishes, scheduling |
| Analytics | Revenue, profit, sales trends, conversion reports |
| AI Assistant | AI quotation generator, profit optimizer, proposal writer, pricing intelligence |

### 1.3 Definitions

| Term | Definition |
|------|------------|
| AI | Artificial Intelligence (OpenAI / Gemini API) |
| GST | Goods and Services Tax |
| OTP | One-Time Password |
| JWT | JSON Web Token |
| CRM | Customer Relationship Management |
| PDF | Portable Document Format |
| UPI | Unified Payments Interface |
| OCR | Optical Character Recognition |
| AMC | Annual Maintenance Contract |
| CRDT | Conflict-Free Replicated Data Type (for offline sync) |

---

## 2. System Features

### 2.1 Authentication & Authorization

- OTP-based login via mobile number
- Google login integration
- JWT token-based session management
- Role-based access control (Super Admin, Company Admin, Sales Executive, Accountant)
- Password reset with OTP verification

### 2.2 Company Management

- Company profile creation with GST, PAN, logo, signature, bank details
- GST configuration (GSTIN, business type, tax rates)
- Business address and contact settings
- Multi-branch support

### 2.3 Customer Management

- Add, edit, delete customers
- Search and filter customers
- Customer history and interaction log
- Customer credit score (based on payment history, delay history, invoice amount)
- Import/export customer data
- Duplicate GST detection

### 2.4 Quotation Management

- AI-powered quotation generator (enter service name → AI generates scope, pricing, timeline, deliverables)
- Voice quotation (speak details → system creates quotation)
- Add custom items with description, quantity, rate
- Apply GST and discounts
- AI profit optimizer (suggests selling price, margin, discount limit based on cost)
- AI proposal writer (software, digital marketing, AMC proposals)
- Auto-generate quotation numbers
- PDF generation with company branding
- Share via WhatsApp (one-click), Email, or link
- Track quotation status (Sent, Viewed, Accepted, Rejected, Expired)
- Duplicate existing quotations

### 2.5 Invoice Management

- One-click convert quotation to invoice
- Generate GST-compliant invoices
- Generate Tax invoices
- Generate Proforma invoices
- Partial invoicing support
- Payment tracking and status
- Invoice PDF generation
- QR payment (UPI QR code, payment link)
- E-signature integration

### 2.6 Receipt Management

- Generate payment receipts against invoices
- Generate advance receipts
- Payment method tracking (Cash, UPI, Bank Transfer, Card, Cheque)
- UPI QR code generation
- Receipt PDF generation

### 2.7 CRM

- Lead tracking from enquiry to conversion
- Customer communication history
- Smart follow-up engine (auto-reminders to customer and sales executive)
- Sales pipeline management
- Customer credit scoring

### 2.8 Marketing Automation

- WhatsApp campaign creation and bulk sending
- Email campaign creation
- SMS campaign creation
- Festival wishes automation
- Campaign scheduling
- Customer segment targeting
- Campaign analytics (open rate, click rate, delivery status)

### 2.9 Competitor Price Intelligence

- Store competitor pricing data
- Suggest optimal pricing based on market data

### 2.10 Analytics & Reporting

- Revenue reports
- Profit analysis reports
- Sales trends
- Customer acquisition reports
- Quotation-to-invoice conversion rate
- Top products/services analysis
- Custom date range filtering
- Export reports to PDF/Excel

### 2.11 AI Assistant

- AI Quotation Generator: generates complete quotations from brief descriptions
- AI Profit Optimizer: suggests optimal pricing, margin, discount limits
- AI Proposal Writer: creates detailed business proposals
- AI Sales Assistant (future): suggests next actions
- AI Call Summary (future): summarizes customer calls

### 2.12 Offline Mode

- Work without internet connection
- Save data locally (SQLite/Couchbase)
- Auto-sync when connection restores
- Conflict resolution for concurrent edits

---

## 3. User Roles

| Role | Responsibilities |
|------|-----------------|
| Super Admin | Platform management, subscription control, system settings |
| Company Admin | Manage company, users, settings, view all data |
| Sales Executive | Manage leads, create quotations, track customers |
| Accountant | Handle billing, invoices, receipts, payment tracking |

---

## 4. Stakeholders

| Stakeholder | Interest |
|-------------|----------|
| Business Owners | ROI, efficiency, customer satisfaction |
| Sales Team | Ease of quotation, AI assistance, lead tracking |
| Accountants | Accuracy, GST compliance, report generation |
| Freelancers | Quick proposals, professional invoicing |
| Admins | User management, platform control |
| Customers | Professional invoices, easy payment |

---

## 5. Hardware & Software Requirements

### 5.1 Android Application

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Android Version | API 24 (Android 7.0) | API 31+ (Android 12+) |
| RAM | 3 GB | 4 GB+ |
| Storage | 100 MB free | 200 MB free |
| Internet | 3G (offline mode supported) | 4G/WiFi |

### 5.2 Web Application

| Requirement | Specification |
|-------------|--------------|
| Browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Internet | Broadband (2 Mbps+) |
| Screen Resolution | 1024x768+ |

### 5.3 Backend Server

| Component | Specification |
|-----------|--------------|
| CPU | 8 vCPU (auto-scaling) |
| RAM | 16 GB |
| Storage | 200 GB SSD |
| OS | Ubuntu 22.04 LTS |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| AI APIs | OpenAI API + Gemini API |

---

## 6. Behavioural Constraints

### Must
- Work offline with automatic sync when online
- Generate PDF in under 3 seconds
- Encrypt all sensitive data with AES-256
- Prevent duplicate invoice numbers
- Prevent duplicate quotation numbers
- Prevent deletion of paid invoices

### Must Not
- Allow duplicate GSTIN for same company
- Allow invoice deletion after payment is recorded
- Allow quotation deletion after conversion to invoice
- Expose sensitive data in API responses

---

## 7. Edge Cases

| Scenario | Handling |
|----------|----------|
| Duplicate GSTIN entry | Block with validation error |
| Internet failure during save | Save locally, sync when online |
| PDF generation failure | Auto-retry with exponential backoff |
| WhatsApp not installed on device | Show fallback: "WhatsApp not available. Share via other methods." |
| Payment gateway failure | Allow retry, log failure, notify user |
| Mobile storage full | Warn user before save fails |
| Concurrent quote edits | CRDT-based merge or last-writer-wins |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
