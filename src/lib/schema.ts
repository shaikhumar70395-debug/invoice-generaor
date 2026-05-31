import { z } from "zod";

export const TaxModeSchema = z.enum(["intra", "inter"]);
export const PaymentStatusSchema = z.enum(["unpaid", "part-paid", "paid"]);

export const InvoiceLineInputSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  hsnSac: z.string(),
  quantity: z.number().min(0),
  rate: z.number().min(0),
  unit: z.string(),
  discountPercent: z.number().min(0).max(100),
  gstRatePercent: z.number().min(0).max(100),
});

export const BuyerDetailsSchema = z.object({
  name: z.string().min(1, "Buyer name is required"),
  address: z.string(),
  gstin: z.string(),
  stateName: z.string(),
  stateCode: z.string(),
});

export const InvoiceMetaSchema = z.object({
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string().optional().default(""),
  modeOfPayment: z.string(),
  buyersOrderNo: z.string(),
  dispatchDocNo: z.string(),
  deliveryNoteDate: z.string(),
  dispatchedThrough: z.string(),
  destination: z.string(),
  deliveryAddress: z.string(),
});

export const InvoiceDraftSchema = z.object({
  meta: InvoiceMetaSchema,
  buyer: BuyerDetailsSchema,
  lines: z.array(InvoiceLineInputSchema),
  taxMode: TaxModeSchema,
  gstRatePercent: z.number().min(0).max(100),
  roundOffEnabled: z.boolean(),
});

export const SellerProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  address: z.string(),
  pan: z.string(),
  gstin: z.string(),
  stateName: z.string(),
  stateCode: z.string(),
  phone: z.string(),
  bankName: z.string(),
  bankAccountNo: z.string(),
  bankIfsc: z.string(),
  bankBranch: z.string(),
  declaration: z.string(),
  invoicePrefix: z.string(),
  logoDataUrl: z.string(),
});

export const CustomerPresetSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  address: z.string(),
  gstin: z.string(),
  stateName: z.string(),
  stateCode: z.string(),
});

export const ProductPresetSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, "Description is required"),
  hsnSac: z.string(),
  unit: z.string(),
  defaultRate: z.number().min(0),
  defaultGstRatePercent: z.number().min(0).max(100),
});

export const PaymentUpdateSchema = z.object({
  paymentStatus: PaymentStatusSchema,
  paidAmount: z.number().min(0),
  paymentDate: z.string(),
  paymentMethod: z.string(),
  paymentNotes: z.string(),
});

export const SetupSecuritySchema = z.object({
  credential: z.string().min(1, "Credential is required"),
  authType: z.string().min(1, "Auth type is required"),
}).superRefine((data, ctx) => {
  if (data.authType === "PIN" && !/^\d{6}$/.test(data.credential)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "PIN must be exactly 6 digits.",
      path: ["credential"],
    });
  }
});

export const LoginSchema = z.object({
  credential: z.string().min(1, "Credential is required"),
});

export const UpdateSecuritySchema = z.object({
  currentCredential: z.string().min(1, "Current credential is required"),
  newCredential: z.string().min(1, "New credential is required"),
  newAuthType: z.string().min(1, "New auth type is required"),
}).superRefine((data, ctx) => {
  if (data.newAuthType === "PIN" && !/^\d{6}$/.test(data.newCredential)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "New PIN must be exactly 6 digits.",
      path: ["newCredential"],
    });
  }
});
