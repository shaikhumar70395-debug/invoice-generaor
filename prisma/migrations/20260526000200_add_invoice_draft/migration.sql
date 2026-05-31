-- Add InvoiceDraftRecord table for server-side draft persistence
CREATE TABLE "InvoiceDraftRecord" (
    "id"        INTEGER NOT NULL PRIMARY KEY DEFAULT 1,
    "draftJson" TEXT    NOT NULL DEFAULT '{}',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
