-- CreateTable
CREATE TABLE "SellerSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "stateCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAccountNo" TEXT NOT NULL,
    "bankIfsc" TEXT NOT NULL,
    "bankBranch" TEXT NOT NULL,
    "declaration" TEXT NOT NULL,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'ECMUM',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
