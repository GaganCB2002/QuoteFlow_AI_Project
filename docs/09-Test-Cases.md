# Test Case Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Authentication Module

### TC-AUTH-001 to TC-AUTH-006

*(Same as version 1.0 — OTP login, invalid OTP, expired OTP, resend, token refresh)*

### TC-AUTH-007: Google Login

| Field | Value |
|-------|-------|
| Test Case ID | TC-AUTH-007 |
| Module | Authentication |
| Priority | High |
| Precondition | Google account exists |
| Steps | 1. Tap "Continue with Google"<br>2. Select Google account<br>3. Grant permissions |
| Expected Result | User logged in successfully via Google OAuth |
| Status | Pass |

---

## 2. Company Module

### TC-COMP-001 to TC-COMP-006

*(Same as version 1.0 — create, logo, invalid logo, oversized, GST, invalid GSTIN)*

### TC-COMP-007: Upload digital signature

| Field | Value |
|-------|-------|
| Test Case ID | TC-COMP-007 |
| Module | Company |
| Priority | Medium |
| Steps | 1. Go to Company Settings<br>2. Upload signature image<br>3. Save |
| Expected Result | Signature saved and appears on PDF documents |
| Status | Pass |

### TC-COMP-008: Configure bank details

| Field | Value |
|-------|-------|
| Test Case ID | TC-COMP-008 |
| Module | Company |
| Priority | Medium |
| Steps | 1. Enter bank account number, IFSC, bank name<br>2. Save |
| Expected Result | Bank details saved, appear on invoices |
| Status | Pass |

---

## 3. Customer Module

### TC-CUST-001 to TC-CUST-008

*(Same as version 1.0 — create, duplicate, search, edit, delete, import, export)*

### TC-CUST-009: Duplicate GST detection

| Field | Value |
|-------|-------|
| Test Case ID | TC-CUST-009 |
| Module | Customer |
| Priority | High |
| Precondition | Customer with GSTIN "29ABCDE1234F1Z5" exists |
| Steps | 1. Add new customer with same GSTIN |
| Expected Result | Validation error: "A customer with this GST number already exists" |
| Status | Pass |

### TC-CUST-010: Customer credit score display

| Field | Value |
|-------|-------|
| Test Case ID | TC-CUST-010 |
| Module | Customer |
| Priority | Medium |
| Precondition | Customer has payment history |
| Steps | 1. Open customer profile |
| Expected Result | Credit score displayed (0-100) with color indicator |
| Status | Pass |

---

## 4. Quotation Module

### 4.1 Manual Quotation

*(TC-QUOTE-001 to TC-QUOTE-014 from version 1.0)*

### 4.2 AI Quotation

### TC-QUOTE-015: AI quotation generation

| Field | Value |
|-------|-------|
| Test Case ID | TC-QUOTE-015 |
| Module | AI Quotation |
| Priority | High |
| Test Data | Input: "Website Development for school" |
| Steps | 1. Tap "AI Generate"<br>2. Enter service description<br>3. Tap "Generate" |
| Expected Result | AI generates scope, items, pricing, timeline in < 5 seconds |
| Status | Pass |

### TC-QUOTE-016: AI profit optimizer

| Field | Value |
|-------|-------|
| Test Case ID | TC-QUOTE-016 |
| Module | AI Quotation |
| Priority | High |
| Test Data | Cost: ₹40,000 |
| Steps | 1. Add item, enter cost price<br>2. Tap "AI Optimize" |
| Expected Result | AI shows: recommended selling, profit, margin %, discount limit |
| Status | Pass |

### TC-QUOTE-017: AI proposal writer

| Field | Value |
|-------|-------|
| Test Case ID | TC-QUOTE-017 |
| Module | AI Quotation |
| Priority | Medium |
| Steps | 1. Tap "AI Proposal"<br>2. Select "Software Development Proposal"<br>3. Enter project details<br>4. Generate |
| Expected Result | Complete proposal generated with all sections |
| Status | Pass |

### TC-QUOTE-018: Voice quotation

| Field | Value |
|-------|-------|
| Test Case ID | TC-QUOTE-018 |
| Module | AI Quotation |
| Priority | Medium |
| Test Data | Speech: "Website for school thirty thousand rupees" |
| Steps | 1. Tap microphone icon<br>2. Speak quotation details<br>3. Tap done |
| Expected Result | Voice converted to quotation items in < 3 seconds |
| Status | Pass |

---

## 5. Invoice Module

### TC-INV-001 to TC-INV-007

*(Same as version 1.0 — convert, GST, create, mark paid, partial, PDF, overdue)*

### TC-INV-008: Proforma invoice

| Field | Value |
|-------|-------|
| Test Case ID | TC-INV-008 |
| Module | Invoice |
| Priority | Medium |
| Steps | 1. Create invoice<br>2. Select type: "Proforma Invoice" |
| Expected Result | Proforma invoice generated with correct label |
| Status | Pass |

### TC-INV-009: UPI QR code generation

| Field | Value |
|-------|-------|
| Test Case ID | TC-INV-009 |
| Module | Invoice |
| Priority | Medium |
| Steps | 1. Open invoice<br>2. Tap "Generate QR" |
| Expected Result | UPI QR code generated and displayed |
| Status | Pass |

### TC-INV-010: E-signature request

| Field | Value |
|-------|-------|
| Test Case ID | TC-INV-010 |
| Module | Invoice |
| Priority | Medium |
| Steps | 1. Open invoice<br>2. Tap "Request Signature"<br>3. Customer signs |
| Expected Result | Signature captured and embedded in PDF |
| Status | Pass |

### TC-INV-011: Prevent deletion of paid invoice

| Field | Value |
|-------|-------|
| Test Case ID | TC-INV-011 |
| Module | Invoice |
| Priority | Critical |
| Precondition | Invoice with status PAID |
| Steps | 1. Try to delete paid invoice |
| Expected Result | Error: "Cannot delete a paid invoice" |
| Status | Pass |

---

## 6. Receipt Module

### TC-REC-001 to TC-REC-004

*(Same as version 1.0 — generate, payment methods, PDF, overpayment)*

### TC-REC-005: Advance receipt

| Field | Value |
|-------|-------|
| Test Case ID | TC-REC-005 |
| Module | Receipt |
| Priority | Medium |
| Steps | 1. Tap "Receipts" → "Advance Receipt"<br>2. Select customer<br>3. Enter amount<br>4. Save |
| Expected Result | Advance receipt generated with unique number, no invoice link |
| Status | Pass |

---

## 7. CRM Module

### TC-CRM-001 to TC-CRM-003

*(Same as version 1.0 — create lead, update status, log interaction)*

### TC-CRM-004: Smart follow-up reminder

| Field | Value |
|-------|-------|
| Test Case ID | TC-CRM-004 |
| Module | CRM |
| Priority | Medium |
| Precondition | Quotation sent 3 days ago, status still SENT |
| Steps | 1. Check notifications |
| Expected Result | Follow-up reminder notification triggered |
| Status | Pass |

---

## 8. Marketing Module

### TC-MKT-001 to TC-MKT-004

*(Create email, schedule, create SMS, no recipients)*

### TC-MKT-005: WhatsApp campaign

| Field | Value |
|-------|-------|
| Test Case ID | TC-MKT-005 |
| Module | Marketing |
| Priority | High |
| Steps | 1. Create WhatsApp campaign<br>2. Write message<br>3. Select customers<br>4. Send |
| Expected Result | Campaign sent via WhatsApp Business API |
| Status | Pass |

### TC-MKT-006: Festival wishes scheduling

| Field | Value |
|-------|-------|
| Test Case ID | TC-MKT-006 |
| Module | Marketing |
| Priority | Medium |
| Steps | 1. Go to "Festival Wishes"<br>2. Select Diwali<br>3. Preview message<br>4. Schedule for Oct 31 |
| Expected Result | Campaign scheduled, status SCHEDULED |
| Status | Pass |

---

## 9. Offline Mode

### TC-OFF-001: Create quotation offline

| Field | Value |
|-------|-------|
| Test Case ID | TC-OFF-001 |
| Module | Offline |
| Priority | Critical |
| Precondition | Airplane mode ON |
| Steps | 1. Create new quotation<br>2. Add items<br>3. Save |
| Expected Result | Quotation saved locally, sync status: PENDING |
| Status | Pass |

### TC-OFF-002: Auto-sync on connectivity restore

| Field | Value |
|-------|-------|
| Test Case ID | TC-OFF-002 |
| Module | Offline |
| Priority | Critical |
| Precondition | Offline data pending |
| Steps | 1. Turn ON internet<br>2. Wait 10 seconds |
| Expected Result | Data synced to server, sync status: SYNCED |
| Status | Pass |

### TC-OFF-003: Sync conflict resolution

| Field | Value |
|-------|-------|
| Test Case ID | TC-OFF-003 |
| Module | Offline |
| Priority | Medium |
| Precondition | Same record edited on two devices offline |
| Steps | 1. Both devices come online |
| Expected Result | Conflict resolved (LWW), no data loss |
| Status | Pass |

---

## 10. AI Module

### TC-AI-001: AI suggestion improvement over time

| Field | Value |
|-------|-------|
| Test Case ID | TC-AI-001 |
| Module | AI |
| Priority | Low |
| Steps | 1. Use AI quotation generator 10 times<br>2. Edit and correct AI suggestions each time |
| Expected Result | AI suggestions improve/adapt to user corrections |
| Status | Pass |

### TC-AI-002: AI fallback when API unavailable

| Field | Value |
|-------|-------|
| Test Case ID | TC-AI-002 |
| Module | AI |
| Priority | Medium |
| Precondition | OpenAI/Gemini API is down |
| Steps | 1. Try to use AI quotation generator |
| Expected Result | Graceful message: "AI service unavailable. Use manual mode." |
| Status | Pass |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
