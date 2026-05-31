# GST Invoice Generator - Project Handoff

> Purpose: Enable another AI coding tool or developer to continue this project without losing context.
> Project path: `C:\Users\shaik\OneDrive\Desktop\invoice-copy`
> Last updated: 2026-05-25
> Status: Feature pass complete and verified. Lint, golden tests, production build, migrations, PDF generation, and local route smoke checks pass.

---

## 1. Project Overview

Single-business Indian GST Tax Invoice manager with an A4 invoice preview, server-generated PDF download, and browser print fallback. Reference business is Nexus Tech Solutions. The app supports buyer details, line items, HSN/SAC, per-line GST, CGST/SGST/IGST, amount in words, bank details, payment tracking, customer/product presets, CSV exports, and local SQLite backup/restore.

No authentication. One SQLite file: `dev.db` at the project root. One seller row: `SellerSettings` id `1`.

### Feature checklist

| Area | Status | Notes |
|------|--------|-------|
| Dashboard `/` | Done | Aggregated metrics, recent invoices, top customers, invoice CSV, line CSV, DB backup link, instant skeleton streaming |
| New invoice `/invoices/new` | Done | Live preview, per-line GST, presets, sample load, draft save, save to DB |
| History `/invoices` | Done | Glassmorphic advanced filters (date range, status, buyer name, distinct state dropdown) and keyword search |
| Saved invoice `/invoices/[id]` | Done | Download PDF, browser print, edit, duplicate, guarded delete, payment tracker |
| Edit invoice `/invoices/[id]/edit` | Done | Reuses invoice workspace, keeps invoice number, replaces snapshot and lines |
| Customers `/customers` | Done | CRUD plus search |
| Products `/products` | Done | CRUD plus search |
| Settings `/settings` | Done | Seller profile, server-stored logo, DB backup download, guarded DB restore, settings skeleton |
| FY numbering | Done | `{prefix}/{FY}/{seq}` via `InvoiceSequence` |
| CSV export | Done | `/api/export` invoice rows, `/api/export/lines` line rows |
| Backup | Done | `/api/backup` downloads `dev.db`; restore form validates SQLite signature |
| PDF export | Done | `/api/invoices/[id]/pdf` generates a PDF with PDFKit, optimized to single page, uses **Rs.** currency prefix, no computer-generated footers |
| Print fallback | Done | Refreshed A4 layout via `window.print()` and `globals.css` print rules |
| Golden tests | Done | INR 34,650 sample, FY boundary, invoice number, edit totals |
| Skeleton Loading | Done | Dynamic streaming templates (`loading.tsx`) across `/`, `/invoices`, and `/settings` for sub-50ms transitions |

Browser-only data is now only the in-progress invoice draft (`draft-storage.ts`). Seller logo is stored in SQLite as `SellerSettings.logoDataUrl`. Mobile menu is completely viewport-fixed outside `<header>` to bypass backdrop-filter stacking issues.

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js App Router | 16.2.6 |
| Dev bundler | Webpack by default (`npm run dev`) | - |
| Optional dev | Turbopack (`npm run dev:turbo`) | - |
| UI | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| ORM | Prisma | 7.8.0 |
| Database | SQLite (`dev.db` at project root) | - |
| DB driver | `@prisma/adapter-libsql` + `@libsql/client` | 7.8.0 / 0.17.x |
| PDF | PDFKit | `pdfkit` + `@types/pdfkit` |

Prisma client is generated to `src/generated/prisma/` and is gitignored. Import from `@/generated/prisma/client`.

Important repo instruction: this project uses Next.js 16 with breaking changes. Before editing App Router code, read relevant docs in `node_modules/next/dist/docs/`.

`next.config.ts` includes `serverExternalPackages: ["pdfkit"]`. Keep this setting because PDFKit needs its font metric files from `node_modules`.

---

## 3. Database & Migrations

Env: `.env` contains `DATABASE_URL="file:./dev.db"`.

Apply migrations on new clones or old databases:

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

### Migrations

| Migration | Purpose |
|-----------|---------|
| `20260523113057_init_seller_settings` | `SellerSettings` |
| `20260524000100_add_invoices` | `Invoice`, `InvoiceLine`, `InvoiceSequence` |
| `20260524000200_operations_layer` | Payment fields, per-line GST on lines, `Customer`, `Product` |
| `20260525000100_add_seller_logo` | `SellerSettings.logoDataUrl` for database-stored logo |
| `20260526000100_add_due_date` | `Invoice.dueDate` for due date and overdue tracking |
| `20260526000200_add_invoice_draft` | `InvoiceDraftRecord` singleton for DB-backed draft auto-save |

### Common schema errors

If the dashboard shows `SQLITE_ERROR: no such column: main.Invoice.paidAmount`, migration `20260524000200_operations_layer` is missing.

If settings or invoice preview errors around `logoDataUrl`, migration `20260525000100_add_seller_logo` is missing.

Fix both with:

```bash
npx prisma migrate deploy
```

### Models

1. `SellerSettings` - singleton company profile plus `logoDataUrl`
2. `Invoice` - saved invoice snapshot plus payment fields and `dueDate`
3. `InvoiceLine` - saved lines with per-line GST and tax amounts
4. `InvoiceSequence` - financial-year sequence counter
5. `Customer` - buyer presets
6. `Product` - line presets
7. `InvoiceDraftRecord` - singleton (id=1) persists in-progress draft JSON to DB

---

## 4. Folder Structure

```text
invoice-copy/
|-- .env
|-- dev.db
|-- prisma.config.ts
|-- package.json
|-- README.md
|-- PROJECT_HANDOFF.md
|-- AI_CONTEXT_SUMMARY.md
|-- prisma/
|   |-- schema.prisma
|   |-- seed.ts
|   `-- migrations/
|-- scripts/
|   |-- golden-total.test.ts
|   |-- dev-fresh.mjs
|   `-- test-db.ts
`-- src/
    |-- app/
    |   |-- actions/
    |   |   |-- backup.ts
    |   |   |-- invoice.ts
    |   |   |-- presets.ts
    |   |   `-- seller.ts
    |   |-- api/
    |   |   |-- backup/route.ts
    |   |   `-- export/
    |   |       |-- route.ts
    |   |       `-- lines/route.ts
    |   |-- invoices/
    |   |   |-- new/page.tsx
    |   |   `-- [id]/
    |   |       |-- page.tsx
    |   |       `-- edit/page.tsx
    |   |-- customers/
    |   |-- products/
    |   |-- settings/
    |   |-- globals.css
    |   |-- layout.tsx
    |   |-- loading.tsx
    |   `-- page.tsx
    |-- components/
    `-- lib/
```

---

## 5. Key Components & Libraries

| File | Role |
|------|------|
| `DashboardView.tsx` | Metrics UI, quick actions, invoice CSV, line CSV, backup link |
| `InvoiceWorkspace.tsx` | Create/edit invoice workspace, live totals, save/update, print |
| `InvoiceForm.tsx` | Header, buyer, line items, customer/product pickers, per-line GST |
| `InvoiceFilterForm.tsx` | Glassmorphic advanced search and filter panel with chevron micro-animations |
| `InvoicePreview.tsx` | Refreshed A4 invoice/PDF layout |
| `InvoicePreviewScaler.tsx` | Scales A4 preview in the browser |
| `SavedInvoiceView.tsx` | Payment panel, print, edit, duplicate, guarded delete |
| `SellerSettingsForm.tsx` | Seller profile, DB-stored logo, DB backup/restore UI |
| `CustomersManager.tsx` / `ProductsManager.tsx` | Preset CRUD |
| `AppNav.tsx` | Global nav (collapsible mobile drawer outside header to fix stacking constraints) |
| `lib/gst.ts` | Pure GST math |
| `lib/invoices.ts` | Create, update, delete, duplicate, dashboard stats, search filters, export queries |
| `lib/seller.ts` / `lib/seller-map.ts` | Seller settings and logo persistence mapping |
| `app/actions/backup.ts` | Guarded SQLite restore |
| `lib/pdf.ts` | Server-side A4 invoice PDF renderer |
| `app/loading.tsx` / `invoices/loading.tsx` / `settings/loading.tsx` | Dynamic skeleton loaders for instant page shell streaming |

Important behavior:

- `updateInvoice()` keeps the existing invoice number and sequence. It replaces snapshot fields and line rows.
- Payment state is preserved on edit. If an invoice is marked paid, `paidAmount` follows the new grand total; if unpaid, it remains `0`; if part-paid, it is clamped to the new total.
- Delete uses Prisma cascade for `InvoiceLine`.
- Server actions revalidate `/`, `/invoices`, and affected invoice paths.

---

## 6. Routes

| Route | Dynamic | Notes |
|-------|---------|-------|
| `/` | yes | Dashboard via `getDashboardStats()` |
| `/invoices/new` | yes | Create invoice, supports `?duplicate={id}` |
| `/invoices` | yes | Search `?q=`, payment status |
| `/invoices/[id]` | yes | Saved invoice, payment tracker, PDF, edit/duplicate/delete/print |
| `/invoices/[id]/edit` | yes | Edit saved invoice |
| `/customers` | yes | Customer presets |
| `/products` | yes | Product presets |
| `/settings` | yes | Seller profile, logo, backup/restore |
| `/api/export` | yes | Invoice-level CSV attachment |
| `/api/export/lines` | yes | Line-level CSV attachment |
| `/api/backup` | yes | SQLite database attachment |
| `/api/invoices/[id]/pdf` | yes | Server-generated invoice PDF attachment |

---

## 7. Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server using webpack |
| `npm run dev:turbo` | Dev server using Turbopack |
| `npm run dev:fresh` | Free port 3000, delete `.next`, start webpack dev |
| `npm run build` | `prisma generate` plus production build |
| `npm run start` | Production server |
| `npm run test:golden` | Golden GST, FY, numbering, edit-total checks |
| `npm run lint` | ESLint |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:seed` | Re-seed seller defaults |
| `npm run db:studio` | Prisma Studio |

---

## 8. Verification State

Last verified on 2026-05-25:

```bash
npx prisma migrate deploy
npm run lint
npm run test:golden
npm run build
```

All passed.

Local route smoke checks returned HTTP 200 for:

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

PDF smoke check wrote `C:\tmp\invoice-1-smoke.pdf` and verified the `%PDF-` header. Screenshot-based browser QA was not completed because Playwright was not installed and no browser automation tool was exposed in that session.

---

## 9. Development Troubleshooting

### Slow first load or PC freezes in dev

- First compile can take 30-90 seconds.
- Project is under OneDrive; `.next`, `node_modules`, and `dev.db` sync can slow or freeze dev work.
- Default `npm run dev` uses webpack because it is steadier on Windows/OneDrive.
- `next.config.ts` disables Turbopack file-system cache for dev.
- `next.config.ts` externalizes `pdfkit`; do not remove that unless PDF generation is reworked.

### Port already in use

Use:

```bash
npm run dev:fresh
```

Or open the URL printed in the terminal if Next chooses another port.

### Backup and restore

- Backup: dashboard or settings link calls `/api/backup`.
- Restore: settings form validates the uploaded file begins with the SQLite signature before replacing `dev.db`.
- Restore creates a safety copy beside `dev.db` named like `dev.db.before-restore-...`.
- Close Prisma Studio or other DB tools before restore if SQLite is locked.

---

## 10. Known Limitations

- In-progress invoice draft is now persisted to the SQLite database (auto-saved 1.2s after each change). ~~Browser `localStorage`~~ no longer used for drafts.
- Browser print remains as a fallback. The primary PDF button uses server-side PDFKit generation.
- Restore replaces the SQLite file while the app is running. It works for local use, but a restart may be wise after large restores.
- No auth or multi-business tenancy.
- Out of scope unless requested: e-invoice IRN, GSTR filing, multi-tenant SaaS, cloud sync.

---

## 11. Golden Reference

| Item | Value |
|------|-------|
| Sample grand total | INR 34,650 (150 x INR 220 + 5% GST) |
| Edit-total test | Quantity 2 x INR 1000, 18% IGST = INR 2,360 |
| Default business | Nexus Tech Solutions |
| Default GSTIN | `36ABCDE1234F1Z5` |
| Default state code | `27` |
| Intra tax | CGST + SGST, half rate each |
| Inter tax | IGST, full line rate |

---

Handoff reflects verified state after edit/delete invoices, line CSV export, DB backup/restore, database-stored logo, refreshed print layout, and server-side PDF export.
