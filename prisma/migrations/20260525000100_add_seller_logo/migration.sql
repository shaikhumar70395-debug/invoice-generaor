-- Store the seller logo in SQLite so it survives browser/device changes.
ALTER TABLE "SellerSettings" ADD COLUMN "logoDataUrl" TEXT NOT NULL DEFAULT '';
