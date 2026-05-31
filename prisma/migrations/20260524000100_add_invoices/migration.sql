-- CreateTable
CREATE TABLE "Invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoiceNumber" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,
    "sequenceNumber" INTEGER NOT NULL,
    "invoiceDate" TEXT NOT NULL,
    "modeOfPayment" TEXT NOT NULL,
    "buyersOrderNo" TEXT NOT NULL,
    "dispatchDocNo" TEXT NOT NULL,
    "deliveryNoteDate" TEXT NOT NULL,
    "dispatchedThrough" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerAddress" TEXT NOT NULL,
    "buyerGstin" TEXT NOT NULL,
    "buyerStateName" TEXT NOT NULL,
    "buyerStateCode" TEXT NOT NULL,
    "taxMode" TEXT NOT NULL,
    "gstRatePercent" REAL NOT NULL,
    "roundOffEnabled" BOOLEAN NOT NULL,
    "totalQuantity" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "cgstRate" REAL NOT NULL,
    "sgstRate" REAL NOT NULL,
    "igstRate" REAL NOT NULL,
    "cgstAmount" REAL NOT NULL,
    "sgstAmount" REAL NOT NULL,
    "igstAmount" REAL NOT NULL,
    "roundOff" REAL NOT NULL,
    "grandTotal" REAL NOT NULL,
    "amountInWords" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InvoiceLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoiceId" INTEGER NOT NULL,
    "lineOrder" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "hsnSac" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "rate" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "discountPercent" REAL NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InvoiceSequence" (
    "financialYear" TEXT NOT NULL PRIMARY KEY,
    "lastNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Invoice_invoiceDate_idx" ON "Invoice"("invoiceDate");

-- CreateIndex
CREATE INDEX "Invoice_buyerName_idx" ON "Invoice"("buyerName");

-- CreateIndex
CREATE INDEX "Invoice_buyerGstin_idx" ON "Invoice"("buyerGstin");

-- CreateIndex
CREATE INDEX "InvoiceLine_invoiceId_idx" ON "InvoiceLine"("invoiceId");
