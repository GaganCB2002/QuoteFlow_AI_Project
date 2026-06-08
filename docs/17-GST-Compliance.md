# GST Compliance Document

## QuoteFlow AI – Smart Quotation, Billing, CRM & Marketing Platform

**Version:** 2.0  
**Date:** June 2026  
**Status:** Draft

---

## 1. Overview

QuoteFlow AI v2.0 supports three invoice types to cover all billing scenarios for Indian businesses:

| Invoice Type | Use Case |
|-------------|----------|
| **GST Invoice** | For GST-registered businesses selling to GST-registered or unregistered customers |
| **Tax Invoice** | For non-GST businesses or exempt supplies |
| **Proforma Invoice** | For advance estimates, quotations converted to tentative bills |

---

## 2. Invoice Type Details

### 2.1 GST Invoice

- Includes supplier and customer GSTIN (if registered)
- CGST + SGST (intra-state) or IGST (inter-state)
- HSN/SAC codes required
- Digital signature optional but recommended

### 2.2 Tax Invoice

- No GST calculation
- For businesses registered under composition scheme
- For export of services (with appropriate declaration)
- Shows "Tax Invoice" header

### 2.3 Proforma Invoice

- Preliminary bill before actual delivery
- No tax implications
- Used for advance payments
- Shows "Proforma Invoice" header (not a tax document)

---

## 3. Invoice Format (GST)

```
                    GST TAX INVOICE
                  [Company Name]
            [Company Address, City, State]
               GSTIN: [GSTIN Number]
              PAN: [PAN Number]
            Phone: [Contact Number]

Invoice No: GST-2026-0001              Date: 08-Jun-2026
State: Maharashtra                     State Code: 27

Bill To:
[Customer Name]
[Customer Company]
[Customer Address]
GSTIN: [Customer GSTIN]

Bank Details:
[Bank Name] | A/c: [Account No] | IFSC: [IFSC Code]

--------------------------------------------------------------------------
#  Item Description     HSN/SAC   Qty   Rate     Taxable     GST%
--------------------------------------------------------------------------
1   Website Design      998311     1    50,000   50,000      18%
2   SEO Package         998312     1    25,000   25,000      18%
--------------------------------------------------------------------------
                          Subtotal:                   75,000.00
                          CGST @ 9%:                   6,750.00
                          SGST @ 9%:                   6,750.00
                          -----------------------------------------
                          Total (in words): Eighty-Eight Thousand
                          Five Hundred Only
                          Total:                     88,500.00
--------------------------------------------------------------------------

[UPI QR Code]

Terms: Payment due within 30 days
       Bank: [Bank Name] | A/c: [Account No] | IFSC: [IFSC Code]

For [Company Name]

[Digital Signature]

Authorized Signatory
```

---

## 4. E-Invoicing Roadmap

| Feature | Phase | Status |
|---------|-------|--------|
| IRN Generation via GST Portal | Phase 8 | Planned |
| Dynamic QR Code on Invoice | Phase 8 | Planned |
| E-Way Bill Integration | Phase 8 | Planned |
| GSTR-1 Auto-filing | Phase 9 | Planned |

---

**Document Version:** 2.0  
**Last Updated:** June 2026  
**Status:** Draft
