import type { SellerProfile } from "@/lib/types";
import type { SellerSettings } from "@/generated/prisma/client";

export function toSellerProfile(row: SellerSettings): SellerProfile {
  return {
    companyName: row.companyName,
    address: row.address,
    pan: row.pan,
    gstin: row.gstin,
    stateName: row.stateName,
    stateCode: row.stateCode,
    phone: row.phone,
    bankName: row.bankName,
    bankAccountNo: row.bankAccountNo,
    bankIfsc: row.bankIfsc,
    bankBranch: row.bankBranch,
    declaration: row.declaration,
    invoicePrefix: row.invoicePrefix,
    logoDataUrl: row.logoDataUrl,
  };
}

export function sellerProfileToDb(data: SellerProfile) {
  return {
    companyName: data.companyName.trim(),
    address: data.address.trim(),
    pan: data.pan.trim(),
    gstin: data.gstin.trim(),
    stateName: data.stateName.trim(),
    stateCode: data.stateCode.trim(),
    phone: data.phone.trim(),
    bankName: data.bankName.trim(),
    bankAccountNo: data.bankAccountNo.trim(),
    bankIfsc: data.bankIfsc.trim(),
    bankBranch: data.bankBranch.trim(),
    declaration: data.declaration.trim(),
    invoicePrefix: data.invoicePrefix.trim() || "ECMUM",
    logoDataUrl: data.logoDataUrl.trim(),
  };
}
