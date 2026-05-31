-- Add payment tracking to issued invoices.
ALTER TABLE "Invoice" ADD COLUMN "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid';
ALTER TABLE "Invoice" ADD COLUMN "paidAmount" REAL NOT NULL DEFAULT 0;
ALTER TABLE "Invoice" ADD COLUMN "paymentDate" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Invoice" ADD COLUMN "paymentMethod" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Invoice" ADD COLUMN "paymentNotes" TEXT NOT NULL DEFAULT '';

-- Add per-line GST snapshots. Existing lines inherit the invoice GST rate.
ALTER TABLE "InvoiceLine" ADD COLUMN "gstRatePercent" REAL NOT NULL DEFAULT 5;
ALTER TABLE "InvoiceLine" ADD COLUMN "cgstAmount" REAL NOT NULL DEFAULT 0;
ALTER TABLE "InvoiceLine" ADD COLUMN "sgstAmount" REAL NOT NULL DEFAULT 0;
ALTER TABLE "InvoiceLine" ADD COLUMN "igstAmount" REAL NOT NULL DEFAULT 0;

UPDATE "InvoiceLine"
SET "gstRatePercent" = COALESCE(
  (SELECT "gstRatePercent" FROM "Invoice" WHERE "Invoice"."id" = "InvoiceLine"."invoiceId"),
  5
);

-- Create preset tables.
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "stateCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "hsnSac" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "defaultRate" REAL NOT NULL,
    "defaultGstRatePercent" REAL NOT NULL DEFAULT 5,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE INDEX "Customer_name_idx" ON "Customer"("name");
CREATE INDEX "Customer_gstin_idx" ON "Customer"("gstin");
CREATE INDEX "Product_description_idx" ON "Product"("description");
CREATE INDEX "Product_hsnSac_idx" ON "Product"("hsnSac");
