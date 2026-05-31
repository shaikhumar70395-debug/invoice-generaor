# GST Invoice Generator - Concise Context Summary

**Path:** `C:\Users\shaik\OneDrive\Desktop\invoice-copy`
**Status:** Feature pass complete and verified on 2026-05-25.
**Full detail:** `PROJECT_HANDOFF.md`

---

## One-line Summary

Local Next.js 16 app for Indian GST invoices: create, edit, delete, duplicate, generate PDF, browser print, track payments, manage customer/product presets, export invoice and line CSVs, and backup/restore the SQLite database. Prisma 7 + SQLite LibSQL adapter. No auth.

---

## Setup

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Use `npm run dev` for webpack dev. It is steadier on Windows/OneDrive than Turbopack.

---

## Current Migrations

1. `20260523113057_init_seller_settings` - seller settings
2. `20260524000100_add_invoices` - invoices, lines, sequence
3. `20260524000200_operations_layer` - payments, per-line GST, customers, products
4. `20260525000100_add_seller_logo` - `SellerSettings.logoDataUrl`

Always run `npx prisma migrate deploy` on a new machine or old `dev.db`.

---

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Dashboard, exports, backup link |
| `/invoices/new` | Create invoice, supports `?duplicate={id}` |
| `/invoices` | Invoice history and search |
| `/invoices/[id]` | Saved invoice, payment tracker, edit/duplicate/delete/print |
| `/invoices/[id]/edit` | Edit saved invoice while keeping invoice number |
| `/customers`, `/products` | Preset CRUD and search |
| `/settings` | Seller profile, DB-stored logo, backup/restore |
| `/api/export` | Invoice-level CSV |
| `/api/export/lines` | Line-level CSV |
| `/api/backup` | Download `dev.db` |
| `/api/invoices/[id]/pdf` | Download server-generated PDF |

---

## Features Done

- Seller settings singleton, including server-stored logo in SQLite.
- Live invoice form plus refreshed A4 print preview.
- Server-side PDF download with PDFKit, formatted with **Rs.** currency prefix, optimized to exactly 1 page for standard sizes, with computer-generated footnotes completely removed.
- Per-line GST with intra-state CGST/SGST and inter-state IGST.
- FY invoice number format: `{prefix}/{FY}/{seq}`.
- Save, list, search, edit, delete, duplicate invoices.
- Edit preserves invoice number and replaces saved snapshot + lines.
- Glassmorphic Advanced search and filtering on Invoice History (by date bounds, payment state, customer name, and unique buyer state).
- Dynamic skeleton loading pages (`loading.tsx` streaming) across Dashboard, History, and Settings for instant transitions on mobile and desktop.
- Fixed collapsible mobile navigation stacked context bug by moving overlay drawer outside `<header>` container.
- Payment tracking: `unpaid`, `part-paid`, `paid`.
- Customer and product presets.
- Invoice-level and line-level CSV exports.
- SQLite backup download and guarded restore from Settings.
- Browser print fallback via `window.print()` and `#invoice-print-surface` CSS.
- Browser `localStorage` draft only; logo is no longer browser-only.
- Golden tests cover INR 34,650 sample, FY boundary, invoice number, and edit totals.

---

## Key Files

- `src/lib/gst.ts` - totals, per-line tax, tax breakup
- `src/lib/invoices.ts` - create, update, delete, list (with advanced filters support), dashboard, duplicate, export queries
- `src/lib/presets.ts` - customer/product CRUD
- `src/lib/invoice-number.ts` - Indian FY Apr-Mar
- `src/lib/seller.ts` and `src/lib/seller-map.ts` - seller settings and logo mapping
- `src/app/actions/invoice.ts` - save, update, delete, payment actions
- `src/app/actions/backup.ts` - guarded SQLite restore
- `src/components/InvoiceWorkspace.tsx` - create/edit invoice workspace
- `src/components/InvoiceFilterForm.tsx` - glassmorphic client-side search/filter panel
- `src/components/SavedInvoiceView.tsx` - saved invoice controls and payment panel
- `src/components/InvoicePreview.tsx` - print/PDF design (using Rs., no computer-generated text)
- `src/components/SellerSettingsForm.tsx` - seller, logo, backup/restore UI
- `src/lib/pdf.ts` - server-side PDF renderer (A4, 1-page bounds, Rs. format, no computer-generated block)
- `src/app/loading.tsx` / `invoices/loading.tsx` / `settings/loading.tsx` - skeleton loader templates

---

## Verification

Last passing checks:

```bash
npx prisma migrate deploy
npm run lint
npm run test:golden
npm run build
```

Smoke checked with HTTP 200:

```text
/
/invoices
/invoices/new
/invoices/1/edit
/settings
/api/export/lines
/api/backup
/api/invoices/1/pdf
```

PDF smoke check wrote `C:\tmp\invoice-1-smoke.pdf` and verified the `%PDF-` header. Screenshot-based visual QA was not completed because Playwright/browser automation was unavailable in the session.

---

## Gotchas

- This is Next.js 16. Read relevant docs in `node_modules/next/dist/docs/` before editing App Router code.
- `next.config.ts` externalizes `pdfkit`; keep that setting so PDFKit can access its font metric files.
- Project is on OneDrive; `.next`, `node_modules`, and `dev.db` sync can slow dev.
- If schema errors mention `paidAmount` or `logoDataUrl`, run `npx prisma migrate deploy`.
- Backup restore replaces `dev.db` and creates a safety copy beside it.
- No auth, no SaaS tenancy, no e-invoice/GSTR filing.

---

## Quick Reference

| Item | Value |
|------|-------|
| Golden total | INR 34,650 |
| Edit total test | INR 2,360 |
| GSTIN seed | `36ABCDE1234F1Z5` |
| State code | `27` |

Updated 2026-05-25 after edit/delete invoices, line CSV, backup/restore, server-stored logo, PDF layout refresh, and server-side PDF export.
