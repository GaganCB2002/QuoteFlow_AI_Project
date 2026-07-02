# 🔥 QuoteFlow AI — Complete Advanced Features List

> Use this as a reference when writing LinkedIn posts. Every feature listed below exists in the actual codebase.

---

## 🤖 AI & Machine Learning Features

| Feature | Description | Backend Service |
|---------|-------------|-----------------|
| **Dual AI Engine** | OpenAI + Google Gemini working together | `AiServiceFactory.java`, `OpenAiProvider.java`, `GeminiAiProvider.java` |
| **AI Estimation Agent** | Analyzes project requirements and generates itemized cost breakdowns | `AiAgentService.java` (18,187 bytes — largest service) |
| **AI Quotation Generator** | Natural language → professional quotation conversion | `AiService.java` |
| **AI Feature Suggester** | Suggests missing features based on project type | `FeatureSuggesterService.java` |
| **AI Profit Optimizer** | Analyzes margins and suggests optimal pricing | `PricingTierService.java` |
| **Self-Learning Engine** | Learns from past quotations to improve future accuracy | `SelfLearningService.java` (12,574 bytes) |
| **Market Research AI** | Real-time web search for competitive pricing data | `MarketResearchService.java` + `WebSearchService.java` |
| **AI Proposal Writer** | Generates professional project proposals | Part of `AiAgentService.java` |

---

## 📊 Estimation Engine — Step-by-Step Wizard

| Step | Options Available |
|------|-------------------|
| **Project Type** | Website, Mobile App, E-Commerce, ERP/CRM, SaaS Platform, Custom Software |
| **Domain** | .com (₹1,200), .in (₹999), .org (₹1,500), .net (₹1,400) |
| **Hosting** | Shared (₹3K), VPS (₹12K), Cloud (₹25K), Dedicated (₹50K) |
| **Database** | MySQL (Free), PostgreSQL (Free), MongoDB (₹8K), SQL Server (₹15K) |
| **SSL** | Basic (Free), Premium (₹4K) |
| **Auth Methods** | Email (₹5K), Mobile OTP (₹3K), Google (₹2K), Facebook (₹2K), Biometric (₹8K) |
| **Payment Gateways** | Razorpay (₹10K), PhonePe (₹8K), UPI (₹5K), Stripe (₹12K) |
| **Notifications** | Email (₹3K), SMS (₹5K), WhatsApp (₹8K), Push (₹6K) |
| **Admin Features** | Dashboard (₹10K), User Mgmt (₹8K), Reports (₹10K), Analytics (₹12K), Audit (₹6K) |
| **AI Features** | Chatbot (₹30K), Quotation Gen (₹20K), Proposal Writer (₹15K), AI Analytics (₹25K) |
| **Modules** | Login, Admin Panel, Payment, CRM, Inventory, Blog, SEO, Chat, Maps, Multi-Language, GST, Delivery |
| **Dev Costs** | UI Design (₹10K), Frontend (₹15K), Backend (₹20K), DB (₹5K), Testing (₹5K), Deployment (₹5K) |

---

## 🧾 Invoicing & Billing

| Feature | Detail |
|---------|--------|
| **Invoice Types** | Tax Invoice, Proforma Invoice, Credit Note |
| **GST Auto-Calculation** | CGST/SGST (intra-state), IGST (inter-state) |
| **HSN/SAC Codes** | Auto-mapped per product/service |
| **Status Tracking** | Paid, Pending, Overdue, Draft |
| **Payment Modes** | Bank Transfer, UPI, Cheque, Cash, Online |
| **Receipts** | Payment receipt generation with transaction ID |
| **PDF Export** | Professional PDF generation for all documents |
| **WhatsApp Sharing** | One-click invoice sharing via WhatsApp |

---

## 🎯 Sierra CRM

| Feature | Detail |
|---------|--------|
| **Kanban Pipeline** | New → Contacted → Proposal → Negotiation → Won → Lost |
| **Lead Scoring** | AI-powered credit scoring per customer |
| **Deal Value Tracking** | Pipeline value in ₹ at every stage |
| **Contact Management** | Full profiles with email, phone, company, GST |
| **Call Logging** | Record calls with notes and outcomes |
| **Auto Follow-ups** | Stage-based automated reminders |
| **Dual Views** | Pipeline (Kanban) view + Table view |
| **Search & Filter** | Real-time search across leads and companies |

---

## 📱 Marketing Campaigns

| Feature | Detail |
|---------|--------|
| **Channels** | WhatsApp, Email, SMS |
| **Campaign Types** | Active, Scheduled, Completed, Draft |
| **Festival Automation** | Pre-scheduled Diwali, Holi, Eid campaigns |
| **Analytics** | Sent, Opened, Clicked, Converted, Revenue tracked |
| **Segmentation** | Target specific customer groups |
| **Templates** | Reusable campaign templates |

---

## 📈 Finance & Analytics

| Feature | Detail |
|---------|--------|
| **Income Tracking** | Per-transaction income logging with categories |
| **Expense Management** | Categorized: Salary, Rent, Infrastructure, Marketing, Software |
| **P&L Statement** | Real-time Profit & Loss calculation |
| **Cash Flow** | Income vs Expense trend analysis |
| **Profit Margin** | Percentage-based profitability tracking |
| **GST Reconciliation** | Tax collected vs tax paid reconciliation |

---

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| **JWT Authentication** | Stateless token-based auth with refresh tokens |
| **OAuth2** | Google login via `OAuth2LoginSuccessHandler.java` |
| **Two-Factor Auth (2FA)** | 6-digit OTP verification |
| **AES-256 Encryption** | Sensitive data encrypted at rest via `EncryptionUtil.java` |
| **BCrypt Hashing** | Password hashing with salt rounds |
| **HMAC Integrity** | Data integrity verification via `HashUtil.java` |
| **Rate Limiting** | API abuse prevention via `RateLimitingFilter.java` |
| **Role-Based Access** | USER, ADMIN, SUPER_ADMIN roles |
| **Audit Logging** | Every admin action tracked in `AuditLog.java` |

---

## 🛍️ Product & Service Management

| Feature | Detail |
|---------|--------|
| **Catalog Management** | Complete product/service catalog |
| **Pricing** | MRP, selling price, discount percentage |
| **GST Configuration** | Per-product GST rate and HSN/SAC code |
| **Stock Tracking** | Current stock, low stock alerts |
| **Categories** | Hierarchical category management |
| **Status Control** | Active/Inactive toggle |
| **Search** | Real-time search with category filtering |

---

## 👥 Customer Management

| Feature | Detail |
|---------|--------|
| **Customer Profiles** | Name, company, email, phone, address, GST |
| **Credit Scoring** | AI-generated customer creditworthiness |
| **Spending History** | Total orders, total spent, average order value |
| **Lifetime Value** | Customer lifetime value calculation |
| **Document History** | All quotations, invoices, receipts per customer |

---

## 🏢 Admin Panel

| Feature | Detail |
|---------|--------|
| **User Management** | View, edit, enable/disable users |
| **User Tracking** | IP, browser, OS, device, geolocation tracking |
| **Activity Logs** | Real-time user activity monitoring |
| **Company Management** | Multi-company support |
| **System Analytics** | Platform usage statistics |

---

## 📲 Platform Support

| Platform | Technology |
|----------|-----------|
| **Web** | React + TypeScript + Vite |
| **Android** | Flutter via Capacitor |
| **iOS** | Flutter via Capacitor |
| **PWA** | Progressive Web App support |

---

## 💰 Pricing Tiers

| Plan | Price | Key Features |
|------|-------|--------------|
| **Starter** | ₹0/month | 100 quotations, Basic invoices, WhatsApp sharing, PDF |
| **Professional** | ₹499/month | Unlimited quotations, AI generator, AI optimizer, Voice quotes, CRM |
| **Business** | ₹999/month | + 10 users, WhatsApp/Email/SMS campaigns, Festival automation, API access |
| **Enterprise** | ₹4,999/month | + Unlimited users, Franchise mgmt, White label, Dedicated manager, SLA |

---

## 📊 Codebase Stats

| Metric | Count |
|--------|-------|
| Frontend Pages | 25 |
| Backend Controllers | 25 |
| Backend Services | 31 |
| Database Entities | 27 |
| DTOs | Multiple |
| Security Classes | 9 |
| AI Providers | 2 (OpenAI + Gemini) |
| Largest Service | `EstimationService.java` (29,227 bytes) |
| Largest Page | `Estimation.tsx` (75,250 bytes) |
