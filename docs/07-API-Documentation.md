# API Documentation

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Base URL:** `https://api.quoteflow.ai/v1`  
**Content-Type:** `application/json`  
**Authentication:** Bearer JWT Token or Google OAuth

---

## 1. Authentication

### 1.1 Request OTP

```
POST /api/auth/request-otp
```
```json
{ "phone": "9876543210" }
```
**Response:** `{ "message": "OTP sent", "expiresIn": 300 }`

### 1.2 Login with OTP

```
POST /api/auth/login
```
```json
{ "phone": "9876543210", "otp": "123456" }
```
**Response:** `{ "token": "jwt...", "refreshToken": "...", "user": { "id": "...", "name": "...", "role": "COMPANY_ADMIN" } }`

### 1.3 Google Login

```
POST /api/auth/google
```
```json
{ "idToken": "google-id-token" }
```
**Response:** `{ "token": "jwt...", "isNewUser": false }`

### 1.4 Refresh Token

```
POST /api/auth/refresh
```
```json
{ "refreshToken": "..." }
```
**Response:** `{ "token": "new-jwt...", "refreshToken": "new-refresh..." }`

---

## 2. Company

### 2.1 Get Company Profile

```
GET /api/company
```
**Response (200):**
```json
{
  "id": "...", "companyName": "Sharma Enterprises",
  "gstNumber": "29ABCDE1234F1Z5", "panNumber": "ABCDE1234F",
  "logoUrl": "https://s3.aws.com/logos/logo.png",
  "signatureUrl": "https://s3.aws.com/signatures/sig.png",
  "bankName": "HDFC Bank", "bankAccount": "1234567890", "ifscCode": "HDFC0001234",
  "address": "123 Main St", "city": "Mumbai", "state": "Maharashtra", "pincode": "400001"
}
```

### 2.2 Update Company Profile

```
PUT /api/company
```

### 2.3 Upload Logo

```
POST /api/company/logo
```
**Content-Type:** multipart/form-data

### 2.4 Upload Signature

```
POST /api/company/signature
```
**Content-Type:** multipart/form-data

---

## 3. Customers

*(All endpoints same as v1.0 — CRUD, search, import, export)*

---

## 4. AI-Powered Quotations

### 4.1 AI Generate Quotation

```
POST /api/ai/generate-quotation
```
```json
{
  "description": "Website Development for school with 5 pages, hosting, and SEO"
}
```
**Response (200):**
```json
{
  "suggestions": [
    { "itemName": "Website Design (5 Pages)", "description": "Responsive design", "quantity": 1, "unitPrice": 25000, "taxRate": 18 },
    { "itemName": "Web Hosting (Annual)", "description": "Shared hosting 1 year", "quantity": 1, "unitPrice": 5000, "taxRate": 18 },
    { "itemName": "SEO Package", "description": "Basic SEO 3 months", "quantity": 1, "unitPrice": 10000, "taxRate": 18 }
  ],
  "totalAmount": 47200,
  "aiConfidence": 0.92,
  "timeline": "4 weeks",
  "deliverables": ["Responsive website", "5 pages", "Contact form", "Google Analytics"]
}
```

### 4.2 AI Profit Optimizer

```
POST /api/ai/optimize-profit
```
```json
{
  "costPrice": 40000,
  "itemName": "Website Development",
  "competitorPrices": [45000, 55000, 60000]
}
```
**Response (200):**
```json
{
  "costPrice": 40000,
  "recommendedSellingPrice": 58000,
  "profit": 18000,
  "profitMargin": 31.03,
  "maxDiscount": 5000,
  "minSellingPrice": 53000,
  "confidence": 0.85
}
```

### 4.3 AI Proposal Writer

```
POST /api/ai/generate-proposal
```
```json
{
  "type": "SOFTWARE_DEVELOPMENT",
  "clientName": "ABC Corp",
  "projectName": "E-commerce Platform",
  "details": "Online store with payment integration, 10 products, admin panel"
}
```
**Response (200):**
```json
{
  "proposalHtml": "<h1>Proposal for ABC Corp</h1><h2>E-commerce Platform</h2>...",
  "sections": ["Executive Summary", "Scope of Work", "Timeline", "Pricing", "Terms"],
  "totalAmount": 250000,
  "estimatedDuration": "8 weeks"
}
```

### 4.4 Voice to Quotation

```
POST /api/ai/voice-quotation
```
**Content-Type:** multipart/form-data (audio file)

**Response (200):**
```json
{
  "transcript": "Website for school thirty thousand rupees with hosting",
  "items": [
    { "itemName": "Website", "unitPrice": 30000, "quantity": 1 },
    { "itemName": "Hosting", "unitPrice": 5000, "quantity": 1 }
  ],
  "totalAmount": 35000
}
```

---

## 5. Standard Quotations

### 5.1 Create Quotation

```
POST /api/quotations
```
```json
{
  "customerId": "...",
  "items": [
    { "itemName": "Website Design", "quantity": 1, "unitPrice": 50000, "taxRate": 18, "costPrice": 35000 }
  ],
  "discountType": "FIXED", "discountValue": 5000,
  "aiGenerated": true, "voiceGenerated": false
}
```

*(All other quotation endpoints same as v1.0 — list, get, update status, PDF, share, duplicate)*

---

## 6. Invoices

### 6.1 Create Invoice

```
POST /api/invoices
```
```json
{
  "customerId": "...",
  "type": "GST",
  "items": [...],
  "dueDate": "2026-07-15"
}
```
**Response:** `{ "invoiceId": "...", "invoiceNo": "GST-2026-0001", "type": "GST" }`

### 6.2 Generate UPI QR

```
POST /api/invoices/{invoiceId}/generate-qr
```
**Response:** `{ "qrCodeUrl": "https://s3...qr.png", "paymentLink": "upi://pay?pa=...&am=..." }`

### 6.3 Request E-Signature

```
POST /api/invoices/{invoiceId}/request-signature
```
**Response:** `{ "signatureUrl": "https://app.quoteflow.ai/sign/abc123", "expiresAt": "2026-06-10T00:00:00Z" }`

### 6.4 Submit E-Signature

```
POST /api/invoices/{invoiceId}/sign
```
```json
{ "signatureData": "base64-encoded-signature-image" }
```
**Response:** `{ "status": "SIGNED", "signedPdfUrl": "https://s3...signed.pdf" }`

*(All other invoice endpoints same as v1.0)*

---

## 7. Receipts

### 7.1 Create Receipt

```
POST /api/receipts
```
```json
{
  "invoiceId": "...",
  "type": "PAYMENT",
  "amount": 50000,
  "paymentMethod": "UPI",
  "transactionRef": "upi@paytm_ref"
}
```

### 7.2 Create Advance Receipt

```
POST /api/receipts/advance
```
```json
{
  "customerId": "...",
  "amount": 25000,
  "paymentMethod": "CASH"
}
```

---

## 8. Marketing

### 8.1 Send WhatsApp Campaign

```
POST /api/campaigns/whatsapp
```
```json
{
  "name": "Summer Sale",
  "message": "Hi {{customer_name}}, check out our summer offers!",
  "customerIds": ["id1", "id2"],
  "scheduledAt": "2026-06-15T10:00:00Z"
}
```

### 8.2 Send Festival Wishes

```
POST /api/campaigns/festival-wishes
```
```json
{
  "festival": "DIWALI",
  "customerIds": ["id1", "id2"],
  "scheduledAt": "2026-10-31T08:00:00Z"
}
```

---

## 9. Analytics

### 9.1 Profit Analysis

```
GET /api/analytics/profit?from=2026-01-01&to=2026-06-08
```
**Response:**
```json
{
  "totalRevenue": 1250000,
  "totalCost": 875000,
  "totalProfit": 375000,
  "profitMargin": 30,
  "topProfitableServices": [
    { "itemName": "Website Development", "profit": 180000, "margin": 35 }
  ]
}
```

---

## 10. Competitor Prices

### 10.1 Add Competitor Price

```
POST /api/competitor-prices
```
```json
{
  "itemName": "Website Development",
  "competitorName": "TechCorp",
  "competitorPrice": 55000,
  "ourPrice": 58000
}
```

### 10.2 Get Price Suggestions

```
GET /api/competitor-prices/suggestions?itemName=Website Development
```
**Response:**
```json
{
  "ourPrice": 58000,
  "averageCompetitorPrice": 52000,
  "suggestedPrice": 55000,
  "competitors": [
    { "name": "TechCorp", "price": 55000 },
    { "name": "WebPro", "price": 50000 }
  ]
}
```

---

## 11. Sync (Offline)

### 11.1 Push Pending Changes

```
POST /api/sync/push
```
```json
{
  "changes": [
    { "entityType": "QUOTATION", "action": "CREATE", "entityId": "...", "payload": {...} }
  ],
  "lastSyncTimestamp": "2026-06-08T10:00:00Z"
}
```
**Response:** `{ "syncedIds": ["..."], "conflicts": [], "serverTimestamp": "2026-06-08T10:05:00Z" }`

### 11.2 Pull Latest Changes

```
GET /api/sync/pull?lastSyncTimestamp=2026-06-08T10:00:00Z
```
**Response:**
```json
{
  "changes": [...],
  "serverTimestamp": "2026-06-08T10:05:00Z"
}
```

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
