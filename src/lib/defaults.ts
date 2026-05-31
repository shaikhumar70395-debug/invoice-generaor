import type { InvoiceDraft, SellerProfile } from "@/lib/types";

export const DEFAULT_SELLER: SellerProfile = {
  companyName: "Nexus Tech Solutions",
  address: "Level 4, Orion Business Park, Cyber City, Hyderabad, Telangana-500081",
  pan: "ABCDE1234F",
  gstin: "36ABCDE1234F1Z5",
  stateName: "TELANGANA",
  stateCode: "36",
  phone: "9876543210",
  bankName: "HDFC BANK",
  bankAccountNo: "50100123456789",
  bankIfsc: "HDFC0001234",
  bankBranch: "CYBERABAD",
  declaration:
    "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.",
  invoicePrefix: "NEXUS",
  logoDataUrl: "",
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function createEmptyLine(id?: string) {
  return {
    id: id ?? crypto.randomUUID(),
    description: "",
    hsnSac: "",
    quantity: 0,
    rate: 0,
    unit: "Nos",
    discountPercent: 0,
    gstRatePercent: 5,
  };
}

export function createSampleInvoiceDraft(): InvoiceDraft {
  return {
    meta: {
      invoiceNumber: "NEXUS/26-27/001",
      invoiceDate: "2026-05-15",
      dueDate: "2026-06-14",
      modeOfPayment: "Bank Transfer",
      buyersOrderNo: "PO-2026-089",
      dispatchDocNo: "",
      deliveryNoteDate: "",
      dispatchedThrough: "",
      destination: "",
      deliveryAddress: "",
    },
    buyer: {
      name: "Acme Innovations Pvt Ltd",
      address: "Sector 17, Phase 2, Electronic City, Bengaluru, Karnataka-560100",
      gstin: "29XYZAB5678C1Z2",
      stateName: "KARNATAKA",
      stateCode: "29",
    },
    lines: [
      {
        id: "sample-line-1",
        description: "E-Commerce Website Development (Frontend & Backend)",
        hsnSac: "998314",
        quantity: 1,
        rate: 85000,
        unit: "Nos",
        discountPercent: 0,
        gstRatePercent: 18,
      },
      {
        id: "sample-line-2",
        description: "Cloud Server Hosting & Maintenance (Annual)",
        hsnSac: "998315",
        quantity: 12,
        rate: 2500,
        unit: "Months",
        discountPercent: 10,
        gstRatePercent: 18,
      }
    ],
    taxMode: "intra",
    gstRatePercent: 5,
    roundOffEnabled: true,
  };
}

export function createEmptyInvoiceDraft(): InvoiceDraft {
  return {
    meta: {
      invoiceNumber: "",
      invoiceDate: todayIso(),
      dueDate: plusDaysIso(30),
      modeOfPayment: "",
      buyersOrderNo: "",
      dispatchDocNo: "",
      deliveryNoteDate: "",
      dispatchedThrough: "",
      destination: "",
      deliveryAddress: "",
    },
    buyer: {
      name: "",
      address: "",
      gstin: "",
      stateName: "",
      stateCode: "",
    },
    lines: [createEmptyLine("line-1")],
    taxMode: "intra",
    gstRatePercent: 5,
    roundOffEnabled: true,
  };
}
