# User Acceptance Testing (UAT) Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. UAT-001: AI-Powered Quotation Workflow

| Field | Value |
|-------|-------|
| Test Case ID | UAT-001 |
| Workflow | AI Quotation → Convert → Invoice → Receipt → Share |
| Role | Sales Executive → Accountant |

**Steps:**
1. Login with Google OAuth
2. Set up company with GST, PAN, logo, signature, bank details
3. Add customer with GST
4. Tap **"AI Generate"** — enter "Website Development for school"
5. Review AI-generated scope, items, pricing, timeline
6. Use **AI Profit Optimizer** — enter cost ₹35,000, accept suggested price ₹52,000
7. Save quotation, generate PDF (verify logo, signature, bank details on PDF)
8. Share via WhatsApp (one-click)
9. Mark as SENT
10. Customer views → status becomes VIEWED
11. Customer accepts → status becomes ACCEPTED
12. **One-click Convert to Invoice** — select GST Invoice type
13. Generate UPI QR code and payment link
14. Request e-signature from customer
15. Customer signs digitally
16. Record payment, generate receipt
17. Verify all documents in customer history

**Expected:** Complete workflow successful — AI generated quotation, converted to GST invoice, customer e-signed, payment recorded, receipt shared via WhatsApp.

---

## 2. UAT-002: Voice Quotation + Offline Mode

| Field | Value |
|-------|-------|
| Test Case ID | UAT-002 |
| Workflow | Voice Quotation offline → Auto-sync online |
| Role | Sales Executive |

**Steps:**
1. Enable Airplane Mode (offline)
2. Open QuoteFlow — app works offline
3. Tap microphone icon, speak: "Website for school thirty thousand"
4. Review voice-to-text conversion
5. Edit if needed, save quotation (stored locally)
6. See sync status: PENDING (yellow icon)
7. Turn off Airplane Mode (restore internet)
8. Wait 10 seconds — auto-sync triggers
9. Verify sync status: SYNCED (green icon)
10. Open web app — quotation visible

**Expected:** Voice quotation created offline, auto-synced when online, accessible from web.

---

## 3. UAT-003: Marketing Campaign + Festival Wishes

| Field | Value |
|-------|-------|
| Test Case ID | UAT-003 |
| Workflow | WhatsApp Campaign → Festival Wishes → Analytics |
| Role | Company Admin |

**Steps:**
1. Navigate to Marketing → New Campaign → WhatsApp
2. Enter campaign name "Summer Sale"
3. Write message with `{{customer_name}}` variable
4. Select 5 customers as recipients
5. Schedule for next hour
6. Verify campaign status: SCHEDULED
7. At scheduled time, verify status: SENT
8. Navigate to Festival Wishes, select Diwali
9. Preview auto-generated greeting
10. Send immediately to 3 customers
11. View campaign analytics — delivery rate shown

**Expected:** Campaigns created, scheduled, sent. Festival wishes sent. Analytics visible.

---

## 4. UAT-004: Offline Sync Conflict Resolution

| Field | Value |
|-------|-------|
| Test Case ID | UAT-004 |
| Workflow | Concurrent offline edits → Sync conflict resolution |
| Role | Multiple Users |

**Steps:**
1. User A opens customer on Device 1 (offline)
2. User B opens same customer on Device 2 (offline)
3. User A changes customer phone number
4. User B changes customer email
5. Both come online simultaneously
6. System syncs both changes (CRDT merge)
7. No data loss — both phone and email updated

**Expected:** Concurrent edits merged without data loss.

---

## 5. UAT-005: Competitor Price Intelligence

| Field | Value |
|-------|-------|
| Test Case ID | UAT-005 |
| Workflow | Competitor Pricing → AI Price Suggestion |
| Role | Business Owner |

**Steps:**
1. Navigate to Analytics → Competitor Prices
2. Add 3 competitors and their prices for "Website Development"
3. Create new quotation for same service
4. Enter cost price
5. Tap "AI Optimize"
6. System shows competitor comparison
7. AI suggests optimal price

**Expected:** Competitor prices stored, AI uses them for pricing suggestions.

---

## 6. UAT-006: Edge Cases

| Field | Value |
|-------|-------|
| Test Case ID | UAT-006 |
| Workflow | Error handling across all modules |
| Role | All |

**Steps:**
1. Try duplicate GSTIN — blocked
2. Try to delete paid invoice — blocked with error
3. Use AI with no internet — graceful fallback to manual mode
4. Share via WhatsApp when WhatsApp not installed — shows fallback message
5. Work offline with full storage — warning at 80% capacity
6. Submit empty AI description — validation: "Please enter a description"
7. Use voice in noisy environment — shows confidence warning, allows editing

**Expected:** All edge cases handled gracefully.

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
