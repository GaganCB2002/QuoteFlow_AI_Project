# User Story Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Authentication & Onboarding

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-001 | New User | As a new user, I want to register using my mobile number or Google account, so that I can quickly create my account. | OTP or Google OAuth, account created in < 30 seconds |
| US-002 | All Users | As a user, I want to login with OTP or Google, so that I don't have to remember a password. | Login completes in < 5 seconds |
| US-003 | All Users | As a user, I want to stay logged in, so that I don't have to login repeatedly. | Token auto-refreshes, session persists 24h |

---

## 2. Company Setup

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-004 | Company Admin | As a company admin, I want to set up my company with GST, PAN, logo, signature, and bank details, so that all documents look professional and compliant. | All fields saved, PDF preview reflects branding |
| US-005 | Company Admin | As a company admin, I want to manage team members and assign roles, so that everyone has appropriate access. | Role permissions enforced on all actions |

---

## 3. Customer Management

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-006 | Sales Executive | As a sales executive, I want to add customers with GST details, so that I can create GST-compliant documents. | Customer saved, duplicate GST blocked |
| US-007 | Accountant | As an accountant, I want to see a customer's credit score based on payment history, so that I know their reliability. | Credit score calculated and displayed |
| US-008 | Sales Executive | As a sales executive, I want to view complete customer history, so that I can see all past quotations, invoices, and receipts. | History shows all documents with status |

---

## 4. AI-Powered Quotation

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-009 | Sales Executive | As a sales executive, I want to enter just a service name like "Website Development" and have AI generate a complete quotation, so that I can create quotes in seconds. | AI generates scope, pricing, timeline, deliverables in < 5 seconds |
| US-010 | Sales Executive | As a sales executive, I want AI to suggest the optimal selling price when I enter my cost, so that I maximize profit. | AI shows: cost, recommended selling, profit, margin %, discount limit |
| US-011 | Sales Executive | As a sales executive, I want AI to write detailed proposals for software, digital marketing, and AMC, so that I save hours of writing. | Complete proposal generated, ready to edit |
| US-012 | Sales Executive | As a sales executive, I want to speak quotation details and have the system create the quotation, so that I can work hands-free. | Voice converted to quotation in < 3 seconds |

---

## 5. Quotation Management

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-013 | Sales Executive | As a sales executive, I want to create and share quotations via WhatsApp with one click, so that customers get them instantly. | WhatsApp intent opens with PDF attached in < 2 seconds |
| US-014 | Sales Executive | As a sales executive, I want to track whether the customer has viewed the quotation, so that I can follow up at the right time. | Status: Sent → Viewed → Accepted/Rejected |
| US-015 | Sales Executive | As a sales executive, I want to convert an accepted quotation to invoice with one click, so that billing is seamless. | Invoice created with all items, taxes, discounts carried over |

---

## 6. Invoice & Billing

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-016 | Accountant | As an accountant, I want to generate GST invoices, tax invoices, and proforma invoices, so that I have the right type for every situation. | All three invoice types available |
| US-017 | Accountant | As an accountant, I want to generate UPI QR codes and payment links, so that customers can pay instantly. | QR code and link generated and shareable |
| US-018 | Customer | As a customer, I want to e-sign the invoice digitally, so that I don't need to print and sign. | Signature captured and embedded in PDF |

---

## 7. Receipts

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-019 | Accountant | As an accountant, I want to generate payment receipts and advance receipts, so that I can acknowledge payments correctly. | Both receipt types generated with unique numbers |
| US-020 | Accountant | As an accountant, I want to send receipts via WhatsApp, so that customers get them instantly. | WhatsApp share works |

---

## 8. CRM & Follow-Up

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-021 | Sales Executive | As a sales executive, I want the system to automatically remind customers and me about follow-ups, so that no lead goes cold. | Auto-reminders sent at scheduled times |
| US-022 | Business Owner | As a business owner, I want to see customer credit scores, so that I can decide on credit limits. | Credit score visible in customer profile |

---

## 9. Marketing

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-023 | Company Admin | As a company admin, I want to send bulk WhatsApp messages to my customers, so that I can run promotions. | Campaign created and sent via WhatsApp Business API |
| US-024 | Company Admin | As a company admin, I want to schedule festival wishes automatically, so that I never miss an occasion. | Festival wishes sent on predefined dates |
| US-025 | Company Admin | As a company admin, I want to see campaign analytics, so that I know how many customers engaged. | Delivery rate, open rate, response rate shown |

---

## 10. Competitor Intelligence

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-026 | Business Owner | As a business owner, I want to store competitor pricing and get suggestions, so that I can price my services competitively. | Competitor data stored, pricing suggestions shown |

---

## 11. Analytics

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-027 | Business Owner | As a business owner, I want to see profit analysis reports, so that I understand which services are most profitable. | Profit margin per service shown in charts |
| US-028 | Business Owner | As a business owner, I want to see conversion rates and sales trends, so that I can make data-driven decisions. | Conversion rate and trends displayed with filters |

---

## 12. Offline Mode

| ID | Role | Story | Acceptance Criteria |
|----|------|-------|-------------------|
| US-029 | Sales Executive | As a sales executive, I want to create quotations even without internet, so that I can work from anywhere. | App works fully offline, data saved locally |
| US-030 | Sales Executive | As a sales executive, I want my data to sync automatically when I'm back online, so that I don't lose any work. | Auto-sync with progress indicator |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
