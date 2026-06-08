# Functional Requirement Document (FRD)

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Authentication Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | User shall register using mobile number with OTP verification | High |
| FR-002 | User shall login using OTP sent to registered mobile number | High |
| FR-003 | User shall login using Google account (OAuth) | Medium |
| FR-004 | System shall issue JWT token upon successful authentication | High |
| FR-005 | System shall refresh token before expiry | Medium |
| FR-006 | User shall logout and invalidate session | High |
| FR-007 | System shall lock account after 5 failed attempts | Medium |
| FR-008 | User shall reset password using OTP verification | High |

---

## 2. Company Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-009 | User shall create company profile with name, address, phone, email | High |
| FR-010 | User shall upload company logo (JPEG, PNG; max 2 MB) | Medium |
| FR-011 | User shall configure GST details including GSTIN and business type | High |
| FR-012 | User shall enter PAN (Permanent Account Number) | Medium |
| FR-013 | User shall upload digital signature | Medium |
| FR-014 | User shall configure bank details (account number, IFSC, bank name) | Medium |
| FR-015 | User shall update company profile information | High |
| FR-016 | User shall configure default tax rates | Medium |
| FR-017 | User shall set document numbering prefix and format | Medium |
| FR-018 | User shall configure currency and locale settings | Low |
| FR-019 | User shall manage multiple branches under same company | Low |

---

## 3. User Management Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | Company Admin shall add users to the company | High |
| FR-021 | Company Admin shall assign roles to users | High |
| FR-022 | Company Admin shall deactivate/reactivate users | Medium |
| FR-023 | User shall view their profile and update personal details | Medium |
| FR-024 | System shall send welcome notification to new users | Low |

---

## 4. Customer Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-025 | User shall add customer with name, phone, email, address, company | High |
| FR-026 | User shall edit customer details | High |
| FR-027 | User shall delete customer (soft delete) | Medium |
| FR-028 | User shall search customers by name, phone, email, or GST | High |
| FR-029 | User shall view customer history (quotations, invoices, receipts) | High |
| FR-030 | User shall view customer credit score based on payment history | Medium |
| FR-031 | User shall filter customers by date range, status, credit score | Medium |
| FR-032 | User shall import customers from CSV file | Low |
| FR-033 | User shall export customer list to CSV/Excel | Low |
| FR-034 | System shall detect and block duplicate GSTIN entry | High |
| FR-035 | System shall detect duplicate customers by phone number | Medium |

---

## 5. Quotation Module

### 5.1 Standard Quotation Features

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-036 | User shall generate a new quotation for a customer | High |
| FR-037 | User shall add custom items with description, quantity, rate | High |
| FR-038 | User shall apply GST with configurable rates (0%, 5%, 12%, 18%, 28%) | High |
| FR-039 | User shall apply discounts (percentage or fixed amount) | Medium |
| FR-040 | System shall auto-calculate subtotal, tax, discount, and total | High |
| FR-041 | User shall add terms and conditions to quotation | Medium |
| FR-042 | User shall save quotation as draft | High |
| FR-043 | User shall generate PDF of quotation with company branding | High |
| FR-044 | User shall share quotation via WhatsApp with one click | High |
| FR-045 | User shall share quotation via Email | Medium |
| FR-046 | User shall share quotation via shareable link | Medium |
| FR-047 | User shall track quotation status (Draft, Sent, Viewed, Accepted, Rejected, Expired) | High |
| FR-048 | User shall duplicate existing quotation | Low |
| FR-049 | System shall auto-generate unique quotation number | High |
| FR-050 | User shall not delete quotation after conversion to invoice | High |

### 5.2 AI-Powered Quotation Features

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-051 | User shall enter a brief service description (e.g., "Website Development") | High |
| FR-052 | AI shall generate scope of work, pricing, timeline, and deliverables | High |
| FR-053 | User shall review and edit AI-generated quotation before saving | High |
| FR-054 | AI shall suggest optimal selling price based on input cost | Medium |
| FR-055 | AI shall calculate recommended profit margin | Medium |
| FR-056 | AI shall suggest maximum discount limit | Medium |
| FR-057 | AI shall generate complete business proposals (software, digital marketing, AMC) | Medium |
| FR-058 | AI shall learn from user corrections to improve suggestions | Low |

### 5.3 Voice Quotation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-059 | User shall speak quotation details (e.g., "Website for school ₹30,000") | Medium |
| FR-060 | System shall convert speech to text and create quotation | Medium |
| FR-061 | User shall review and edit voice-generated quotation | Medium |

---

## 6. Invoice Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-062 | User shall convert quotation to invoice with one click | High |
| FR-063 | User shall create invoice from scratch | High |
| FR-064 | User shall generate GST-compliant invoice | High |
| FR-065 | User shall generate Tax invoice (non-GST) | High |
| FR-066 | User shall generate Proforma invoice | Medium |
| FR-067 | System shall auto-calculate GST (CGST, SGST, IGST) | High |
| FR-068 | User shall record partial payments against invoice | Medium |
| FR-069 | User shall mark invoice as paid/unpaid/partial/overdue | High |
| FR-070 | User shall generate invoice PDF | High |
| FR-071 | User shall share invoice via WhatsApp/Email | Medium |
| FR-072 | System shall auto-generate unique invoice number | High |
| FR-073 | User shall set invoice due date | Medium |
| FR-074 | User shall apply late payment charges | Low |
| FR-075 | System shall prevent deletion of paid invoices | High |
| FR-076 | User shall generate UPI QR code for invoice payment | Medium |
| FR-077 | User shall send payment link to customer | Medium |
| FR-078 | Customer shall e-sign the invoice digitally | Medium |

---

## 7. Receipt Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-079 | User shall generate payment receipt against invoice | High |
| FR-080 | User shall generate advance receipt (without invoice) | High |
| FR-081 | User shall select payment method (Cash, UPI, Bank Transfer, Card, Cheque) | High |
| FR-082 | User shall generate UPI QR code for receipt | Medium |
| FR-083 | System shall generate receipt PDF | High |
| FR-084 | User shall share receipt via WhatsApp/Email | Medium |
| FR-085 | System shall auto-generate unique receipt number | High |

---

## 8. CRM Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-086 | User shall add leads with source information (website, referral, walk-in, etc.) | Medium |
| FR-087 | User shall update lead status (New, Contacted, Qualified, Converted, Lost) | Medium |
| FR-088 | User shall log customer interactions (calls, emails, meetings) | Medium |
| FR-089 | User shall set follow-up reminders | Medium |
| FR-090 | Smart follow-up engine shall auto-remind customer and sales executive | Medium |
| FR-091 | User shall view sales pipeline | Low |
| FR-092 | System shall calculate customer credit score based on payment history | Medium |
| FR-093 | System shall send follow-up notifications | Low |

---

## 9. Marketing Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-094 | User shall create WhatsApp campaigns with bulk messaging | Medium |
| FR-095 | User shall create email campaigns | Medium |
| FR-096 | User shall create SMS campaigns | Medium |
| FR-097 | User shall schedule campaign delivery | Medium |
| FR-098 | User shall send automated festival wishes | Medium |
| FR-099 | User shall select target customer segments | Medium |
| FR-100 | User shall preview campaign before sending | Medium |
| FR-101 | System shall track campaign delivery, open rates, click rates | Medium |

---

## 10. Competitor Price Intelligence

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-102 | User shall store competitor pricing data | Low |
| FR-103 | System shall suggest optimal pricing based on competitor data | Low |

---

## 11. Analytics Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-104 | User shall view revenue dashboard with charts | Medium |
| FR-105 | User shall view profit analysis reports | Medium |
| FR-106 | User shall view quotation-to-invoice conversion rate | Medium |
| FR-107 | User shall view customer acquisition reports | Medium |
| FR-108 | User shall filter analytics by date range | Medium |
| FR-109 | User shall export reports to PDF/Excel | Low |
| FR-110 | User shall view top-selling products/services | Low |
| FR-111 | User shall view sales trends over time | Low |

---

## 12. AI Assistant Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-112 | AI shall generate complete quotation from brief service description | High |
| FR-113 | AI shall optimize profit by suggesting selling price and margin | Medium |
| FR-114 | AI shall write business proposals (software, digital marketing, AMC) | Medium |
| FR-115 | AI shall improve suggestions based on user feedback | Low |
| FR-116 | AI Sales Assistant shall suggest next actions (future) | Low |
| FR-117 | AI Call Summary shall summarize customer calls (future) | Low |

---

## 13. Offline Module

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-118 | Application shall work without active internet connection | High |
| FR-119 | Data shall be saved locally on device | High |
| FR-120 | System shall automatically sync data when internet connection is restored | High |
| FR-121 | System shall resolve sync conflicts using CRDT or last-writer-wins | Medium |
| FR-122 | User shall see sync status indicator (synced/pending/error) | Medium |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
