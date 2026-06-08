# Database Design Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Entity Relationship Diagram (ERD)

```
┌───────────────┐     ┌──────────────────┐     ┌───────────────┐
│     USERS      │     │    COMPANIES     │     │   CUSTOMERS    │
├───────────────┤     ├──────────────────┤     ├───────────────┤
│ id (PK)       │──┐  │ id (PK)          │──┐  │ id (PK)       │
│ company_id(FK)│  └──│ owner_id (FK)    │  └──│ company_id(FK)│
│ name          │     │ company_name     │     │ name          │
│ email         │     │ gst_number       │     │ company_name  │
│ phone         │     │ pan_number       │     │ phone         │
│ google_id     │     │ logo_url         │     │ email         │
│ password_hash │     │ signature_url    │     │ gst           │
│ role          │     │ bank_name        │     │ address       │
│ is_active     │     │ bank_account     │     │ credit_score  │
│ created_at    │     │ ifsc_code        │     │ created_at    │
└───────────────┘     │ address          │     └───────┬───────┘
                      │ city             │             │
┌───────────────┐     │ state            │             │
│    LEADS      │     │ pincode          │             │
├───────────────┤     │ currency         │             │
│ id (PK)       │     │ created_at       │             │
│ company_id(FK)│     └──────────────────┘             │
│ customer_id(FK)│            │                        │
│ source        │            │                        │
│ status        │            │                        │
│ assigned_to   │            │                        │
│ notes         │            │                        │
│ created_at    │            │                        │
└───────┬───────┘            │                        │
        │                    │                        │
┌───────┴────────────────────┴────────────────────────┴──────┐
│                       QUOTATIONS                             │
├─────────────────────────────────────────────────────────────┤
│ id (PK)           │ quote_no (unique)                       │
│ company_id (FK)   │ customer_id (FK)                        │
│ created_by (FK)   │ status (DRAFT/SENT/VIEWED/ACCEPTED/...) │
│ subtotal          │ discount_type/value                     │
│ tax_type          │ tax_amount                              │
│ total_amount      │ ai_generated (boolean)                  │
│ ai_confidence     │ voice_generated (boolean)               │
│ notes             │ terms_conditions                        │
│ valid_until       │ created_at / updated_at                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    QUOTATION_ITEMS                            │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ quotation_id (FK)                        │
│ item_name         │ description                              │
│ quantity          │ unit_price                               │
│ discount          │ tax_rate                                 │
│ total             │ sort_order                               │
│ ai_suggested      │ cost_price (for profit calc)             │
└──────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      INVOICES                                 │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ invoice_no (unique)                      │
│ company_id (FK)   │ customer_id (FK)                         │
│ quotation_id (FK) │ created_by (FK)                          │
│ type (GST/TAX/PROFORMA)                                      │
│ status (PAID/UNPAID/PARTIAL/OVERDUE)                         │
│ subtotal          │ discount                                 │
│ tax_amount        │ total_amount                             │
│ amount_paid       │ balance_due                              │
│ due_date          │ issue_date                               │
│ upi_qr_url        │ payment_link                             │
│ e_signature_url   │ created_at / updated_at                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                     INVOICE_ITEMS                             │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ invoice_id (FK)                          │
│ item_name         │ description                              │
│ quantity          │ unit_price                               │
│ discount          │ tax_rate                                 │
│ total             │ sort_order                               │
└──────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                      RECEIPTS                                 │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ receipt_no (unique)                      │
│ company_id (FK)   │ customer_id (FK)                         │
│ invoice_id (FK)   │ created_by (FK)                          │
│ type (PAYMENT/ADVANCE)                                       │
│ amount            │ payment_method                           │
│ transaction_ref   │ payment_date                             │
│ upi_qr_url        │ notes                                    │
│ created_at                                                   │
└──────────────────────────────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│                    CAMPAIGNS                                  │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ company_id (FK)                          │
│ name              │ type (WHATSAPP/EMAIL/SMS)                │
│ content           │ status (DRAFT/SCHEDULED/SENT/FAILED)     │
│ scheduled_at      │ sent_at                                  │
│ created_by        │ created_at                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│               CAMPAIGN_RECIPIENTS                             │
├──────────────────────────────────────────────────────────────┤
│ id (PK)           │ campaign_id (FK)                         │
│ customer_id (FK)  │ status (PENDING/SENT/FAILED)             │
│ opened_at         │ clicked_at                               │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               COMPETITOR_PRICES                               │
├─────────────────────────────────────────────────────────────┤
│ id (PK)           │ company_id (FK)                         │
│ item_name         │ competitor_name                         │
│ competitor_price  │ our_price                               │
│ updated_at                                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               AUDIT_LOGS                                      │
├─────────────────────────────────────────────────────────────┤
│ id (PK)           │ company_id (FK)                         │
│ user_id (FK)      │ action                                  │
│ entity_type       │ entity_id                               │
│ details (JSONB)   │ ip_address                              │
│ created_at                                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               SYNC_QUEUE (Mobile)                             │
├─────────────────────────────────────────────────────────────┤
│ id (PK)           │ entity_type                             │
│ entity_id         │ action (CREATE/UPDATE/DELETE)           │
│ payload (JSONB)   │ status (PENDING/SYNCED/FAILED)          │
│ created_at        │ synced_at                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. New & Updated Tables

### companies (updated)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| owner_id | UUID | FK → users(id) | |
| company_name | VARCHAR(255) | NOT NULL | |
| gst_number | VARCHAR(20) | UNIQUE, NULLABLE | GSTIN |
| pan_number | VARCHAR(10) | NULLABLE | PAN |
| logo_url | TEXT | NULLABLE | S3 URL |
| signature_url | TEXT | NULLABLE | Digital signature image |
| bank_name | VARCHAR(255) | NULLABLE | |
| bank_account | VARCHAR(30) | NULLABLE | Account number |
| ifsc_code | VARCHAR(15) | NULLABLE | IFSC code |
| address | TEXT | NOT NULL | |
| city | VARCHAR(100) | NOT NULL | |
| state | VARCHAR(100) | NOT NULL | |
| pincode | VARCHAR(10) | NOT NULL | |
| currency | VARCHAR(10) | DEFAULT 'INR' | |
| invoice_prefix | VARCHAR(20) | DEFAULT 'INV-' | |
| quote_prefix | VARCHAR(20) | DEFAULT 'Q-' | |
| receipt_prefix | VARCHAR(20) | DEFAULT 'RCP-' | |
| is_active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

### customers (updated)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies(id) | |
| name | VARCHAR(255) | NOT NULL | |
| company_name | VARCHAR(255) | NULLABLE | Customer's company |
| phone | VARCHAR(20) | NOT NULL | |
| email | VARCHAR(255) | NULLABLE | |
| gst | VARCHAR(20) | NULLABLE | Customer GSTIN |
| address | TEXT | NULLABLE | |
| city | VARCHAR(100) | NULLABLE | |
| state | VARCHAR(100) | NULLABLE | |
| pincode | VARCHAR(10) | NULLABLE | |
| credit_score | INTEGER | DEFAULT 50 | 0-100 score |
| notes | TEXT | NULLABLE | |
| is_active | BOOLEAN | DEFAULT true | |
| created_at | TIMESTAMP | DEFAULT NOW() | |

### quotations (updated)

| Column | Type | Description |
|--------|------|-------------|
| ... (all existing columns) | | |
| ai_generated | BOOLEAN | DEFAULT false | Was this AI-generated? |
| ai_confidence | DECIMAL(5,2) | NULLABLE | AI confidence score |
| voice_generated | BOOLEAN | DEFAULT false | Was this voice-generated? |

### quotation_items (updated)

| Column | Type | Description |
|--------|------|-------------|
| ... (all existing columns) | | |
| ai_suggested | BOOLEAN | DEFAULT false | Item suggested by AI |
| cost_price | DECIMAL(15,2) | NULLABLE | For profit calculation |

### invoices (updated)

| Column | Type | Description |
|--------|------|-------------|
| ... (all existing columns) | | |
| type | VARCHAR(20) | NOT NULL DEFAULT 'GST' | GST, TAX, PROFORMA |
| upi_qr_url | TEXT | NULLABLE | UPI QR code image URL |
| payment_link | TEXT | NULLABLE | Payment link URL |
| e_signature_url | TEXT | NULLABLE | E-signature image URL |

### receipts (updated)

| Column | Type | Description |
|--------|------|-------------|
| ... (all existing columns) | | |
| type | VARCHAR(20) | NOT NULL DEFAULT 'PAYMENT' | PAYMENT, ADVANCE |
| upi_qr_url | TEXT | NULLABLE | UPI QR code image URL |

### competitor_prices (new)

| Column | Type | Constraints | Description |
|--------|------|------------|-------------|
| id | UUID | PK | |
| company_id | UUID | FK → companies(id) | |
| item_name | VARCHAR(255) | NOT NULL | Service/product name |
| competitor_name | VARCHAR(255) | NOT NULL | Competitor business name |
| competitor_price | DECIMAL(15,2) | NOT NULL | Competitor's price |
| our_price | DECIMAL(15,2) | NULLABLE | Our current price |
| notes | TEXT | NULLABLE | |
| updated_at | TIMESTAMP | DEFAULT NOW() | |

**Indexes:** idx_competitor_prices_company (company_id), idx_competitor_prices_item (company_id, item_name)

### sync_queue (new - mobile local)

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | PK |
| entity_type | VARCHAR(50) | NOT NULL | e.g., QUOTATION, INVOICE |
| entity_id | UUID | NOT NULL | |
| action | VARCHAR(20) | NOT NULL | CREATE, UPDATE, DELETE |
| payload | JSONB | NOT NULL | Full entity data |
| status | VARCHAR(20) | DEFAULT 'PENDING' | PENDING, SYNCED, FAILED |
| created_at | TIMESTAMP | DEFAULT NOW() | |
| synced_at | TIMESTAMP | NULLABLE | |

---

## 3. Credit Score Calculation Logic

```sql
-- Customer Credit Score (0-100)
-- Based on payment history, delay history, and invoice amount

-- Factors:
-- 1. On-time payment rate (40 points max)
-- 2. Average payment delay (30 points max)
-- 3. Total invoice amount (20 points max)
-- 4. Relationship duration (10 points max)

CREATE OR REPLACE FUNCTION calculate_credit_score(customer_id UUID)
RETURNS INTEGER AS $$
DECLARE
    on_time_rate DECIMAL;
    avg_delay_days DECIMAL;
    total_amount DECIMAL;
    months_active INTEGER;
    score INTEGER := 0;
BEGIN
    -- On-time payment rate (0-40 points)
    SELECT
        COALESCE(COUNT(*) FILTER (WHERE r.created_at <= i.due_date) * 100.0 / NULLIF(COUNT(*), 0), 0)
    INTO on_time_rate
    FROM invoices i
    JOIN receipts r ON r.invoice_id = i.id
    WHERE i.customer_id = $1;

    score := score + (on_time_rate / 100 * 40)::INTEGER;

    -- Average delay (0-30 points)
    SELECT
        COALESCE(AVG(EXTRACT(DAY FROM (r.created_at - i.due_date))), 0)
    INTO avg_delay_days
    FROM invoices i
    JOIN receipts r ON r.invoice_id = i.id
    WHERE i.customer_id = $1 AND r.created_at > i.due_date;

    score := score + GREATEST(0, 30 - avg_delay_days::INTEGER);

    -- Total amount factor (0-20 points)
    SELECT COALESCE(SUM(total_amount), 0) INTO total_amount
    FROM invoices WHERE customer_id = $1;

    score := score + LEAST(20, (total_amount / 100000)::INTEGER);

    -- Relationship duration (0-10 points)
    SELECT COALESCE(
        EXTRACT(MONTH FROM NOW() - MIN(created_at)), 0
    ) INTO months_active
    FROM invoices WHERE customer_id = $1;

    score := score + LEAST(10, months_active);

    RETURN LEAST(100, GREATEST(0, score));
END;
$$ LANGUAGE plpgsql;
```

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
