-- Add dueDate column to Invoice (defaults to empty string for existing rows)
ALTER TABLE "Invoice" ADD COLUMN "dueDate" TEXT NOT NULL DEFAULT '';
