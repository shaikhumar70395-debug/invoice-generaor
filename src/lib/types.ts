export type TaxMode = "intra" | "inter";
export type PaymentStatus = "unpaid" | "part-paid" | "paid";

export type InvoiceLineInput = {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  unit: string;
  discountPercent: number;
  gstRatePercent: number;
};

export type InvoiceLineComputed = InvoiceLineInput & {
  slNo: number;
  amount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
};

export type InvoiceTaxBreakup = {
  gstRatePercent: number;
  taxableAmount: number;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
};

export type BuyerDetails = {
  name: string;
  address: string;
  gstin: string;
  stateName: string;
  stateCode: string;
};

export type InvoiceMeta = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  modeOfPayment: string;
  buyersOrderNo: string;
  dispatchDocNo: string;
  deliveryNoteDate: string;
  dispatchedThrough: string;
  destination: string;
  deliveryAddress: string;
};

export type InvoiceDraft = {
  meta: InvoiceMeta;
  buyer: BuyerDetails;
  lines: InvoiceLineInput[];
  taxMode: TaxMode;
  gstRatePercent: number;
  roundOffEnabled: boolean;
};

export type InvoiceTotals = {
  lines: InvoiceLineComputed[];
  totalQuantity: number;
  subtotal: number;
  cgstRate: number;
  sgstRate: number;
  igstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  roundOff: number;
  grandTotal: number;
  amountInWords: string;
  taxBreakup: InvoiceTaxBreakup[];
};

export type SellerProfile = {
  companyName: string;
  address: string;
  pan: string;
  gstin: string;
  stateName: string;
  stateCode: string;
  phone: string;
  bankName: string;
  bankAccountNo: string;
  bankIfsc: string;
  bankBranch: string;
  declaration: string;
  invoicePrefix: string;
  logoDataUrl: string;
};

export type CustomerPreset = {
  id: number;
  name: string;
  address: string;
  gstin: string;
  stateName: string;
  stateCode: string;
};

export type ProductPreset = {
  id: number;
  description: string;
  hsnSac: string;
  unit: string;
  defaultRate: number;
  defaultGstRatePercent: number;
};
