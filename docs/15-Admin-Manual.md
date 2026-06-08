# Admin Manual

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Super Admin — AI Feature Management

### 1.1 Configure AI Providers

1. Go to **Admin → Settings → AI Configuration**
2. Select primary AI provider: **OpenAI** or **Gemini**
3. Enter API keys (stored in AWS Secrets Manager)
4. Configure fallback provider (if primary fails)
5. Set rate limits per user tier:
   - Free: 10 AI requests/day
   - Pro: 100 AI requests/day
   - Business: 500 AI requests/day
   - Enterprise: Unlimited

### 1.2 Monitor AI Usage

1. Go to **Admin → Monitoring → AI Usage**
2. View:
   - Total AI requests (daily/weekly/monthly)
   - Avg response time
   - Error rate
   - Cost per request
   - Top users by AI usage

### 1.3 AI Prompt Management

1. Go to **Admin → AI → Prompt Templates**
2. View/edit system prompts for:
   - AI Quotation Generator
   - AI Profit Optimizer
   - AI Proposal Writer
3. Update prompts to improve AI output quality

---

## 2. Super Admin — Offline Sync Monitoring

1. Go to **Admin → Monitoring → Sync Status**
2. View:
   - Total offline users
   - Pending sync records
   - Sync conflict count
   - Avg sync latency
3. Resolve stuck sync records manually if needed

---

## 3. Company Admin — Feature Management

### 3.1 Enable/Disable AI Features

1. Go to **Settings → Feature Management**
2. Toggle features for your company:
   - AI Quotation Generator
   - AI Profit Optimizer
   - AI Proposal Writer
   - Voice Quotation
   - WhatsApp Campaigns
   - Festival Wishes
   - E-Signature
   - QR Payments

### 3.2 Configure Document Types

1. Go to **Settings → Document Types**
2. Enable/disable invoice types:
   - GST Invoice
   - Tax Invoice
   - Proforma Invoice
3. Set default invoice type

---

## 4. Subscription & Billing

### 4.1 View Current Plan

1. Go to **Admin → Billing → Subscription**
2. View current tier, usage limits, renewal date
3. Upgrade or downgrade plan

### 4.2 AI Credits

1. Go to **Admin → Billing → AI Credits**
2. View remaining AI credits for current billing cycle
3. Purchase additional AI credits if needed

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
