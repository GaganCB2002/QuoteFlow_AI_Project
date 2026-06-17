-- QuoteFlow AI Database Schema
-- PostgreSQL 16
-- Version: 1.0

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies (created first so users can reference it)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    gst_number VARCHAR(20) UNIQUE,
    pan_number VARCHAR(10),
    logo_url TEXT,
    signature_url TEXT,
    bank_name VARCHAR(255),
    bank_account VARCHAR(30),
    ifsc_code VARCHAR(15),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    invoice_prefix VARCHAR(20) DEFAULT 'INV-',
    quote_prefix VARCHAR(20) DEFAULT 'Q-',
    receipt_prefix VARCHAR(20) DEFAULT 'RCP-',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Users (references companies; FK to owner added via ALTER after both exist)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) UNIQUE NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'SALES_EXECUTIVE',
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Add owner FK now that both companies and users exist
ALTER TABLE companies ADD COLUMN owner_id UUID REFERENCES users(id);

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    gst VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    credit_score INTEGER DEFAULT 50,
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotations
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_no VARCHAR(50) NOT NULL UNIQUE,
    company_id UUID REFERENCES companies(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    created_by UUID REFERENCES users(id) NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT',
    subtotal DECIMAL(15,2) NOT NULL,
    discount_type VARCHAR(20),
    discount_value DECIMAL(15,2) DEFAULT 0,
    tax_type VARCHAR(20),
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    ai_generated BOOLEAN DEFAULT false,
    ai_confidence DECIMAL(5,2),
    voice_generated BOOLEAN DEFAULT false,
    notes TEXT,
    terms_conditions TEXT,
    valid_until DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotation Items
CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quotation_id UUID REFERENCES quotations(id) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    cost_price DECIMAL(15,2),
    ai_suggested BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_no VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'GST',
    company_id UUID REFERENCES companies(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    quotation_id UUID REFERENCES quotations(id),
    created_by UUID REFERENCES users(id) NOT NULL,
    status VARCHAR(30) DEFAULT 'UNPAID',
    subtotal DECIMAL(15,2) NOT NULL,
    discount_type VARCHAR(20),
    discount_value DECIMAL(15,2) DEFAULT 0,
    tax_type VARCHAR(20),
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    amount_paid DECIMAL(15,2) DEFAULT 0,
    balance_due DECIMAL(15,2) DEFAULT 0,
    due_date DATE,
    issue_date DATE NOT NULL,
    upi_qr_url TEXT,
    payment_link TEXT,
    e_signature_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Invoice Items
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES invoices(id) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Receipts
CREATE TABLE receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_no VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'PAYMENT',
    company_id UUID REFERENCES companies(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    invoice_id UUID REFERENCES invoices(id),
    created_by UUID REFERENCES users(id) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    transaction_ref VARCHAR(255),
    payment_date DATE NOT NULL,
    upi_qr_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    customer_id UUID REFERENCES customers(id),
    source VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'NEW',
    assigned_to UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaigns
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'DRAFT',
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaign Recipients
CREATE TABLE campaign_recipients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) NOT NULL,
    customer_id UUID REFERENCES customers(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP
);

-- Competitor Prices
CREATE TABLE competitor_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    competitor_name VARCHAR(255) NOT NULL,
    competitor_price DECIMAL(15,2) NOT NULL,
    our_price DECIMAL(15,2),
    notes TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    company_id UUID REFERENCES companies(id),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_customers_company ON customers(company_id);
CREATE INDEX idx_customers_phone ON customers(company_id, phone);
CREATE INDEX idx_customers_gst ON customers(company_id, gst);
CREATE INDEX idx_quotations_company ON quotations(company_id);
CREATE INDEX idx_quotations_customer ON quotations(customer_id);
CREATE INDEX idx_quotations_status ON quotations(company_id, status);
CREATE INDEX idx_invoices_company ON invoices(company_id);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(company_id, status);
CREATE INDEX idx_receipts_company ON receipts(company_id);
CREATE INDEX idx_receipts_invoice ON receipts(invoice_id);
CREATE INDEX idx_leads_company ON leads(company_id);
CREATE INDEX idx_leads_status ON leads(company_id, status);
CREATE INDEX idx_campaigns_company ON campaigns(company_id);
CREATE INDEX idx_audit_logs_company ON audit_logs(company_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
