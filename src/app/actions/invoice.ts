"use server";

import {
  createInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoicePayment,
} from "@/lib/invoices";
import type { InvoiceDraft, PaymentStatus } from "@/lib/types";
import { InvoiceDraftSchema, PaymentUpdateSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function saveInvoiceAction(
  draft: InvoiceDraft,
): Promise<{ ok: true; id: number } | { ok: false; error: string }> {
  try {
    const parsed = InvoiceDraftSchema.safeParse(draft);
    if (!parsed.success) {
      console.error("Validation failed for createInvoice:", parsed.error);
      return { ok: false, error: "Invalid invoice data provided." };
    }
    const id = await createInvoice(parsed.data);
    revalidatePath("/");
    revalidatePath("/invoices");
    revalidatePath("/invoices/new");
    revalidatePath(`/invoices/${id}`);
    return { ok: true, id };
  } catch (error) {
    console.error("saveInvoiceAction crashed:", error);
    return { ok: false, error: "Could not save invoice. Please try again." };
  }
}

export async function updateInvoiceAction(
  id: number,
  draft: InvoiceDraft,
): Promise<{ ok: true; id: number } | { ok: false; error: string }> {
  try {
    const parsed = InvoiceDraftSchema.safeParse(draft);
    if (!parsed.success) {
      console.error("Validation failed for updateInvoice:", parsed.error);
      return { ok: false, error: "Invalid invoice data provided." };
    }
    const updatedId = await updateInvoice(id, parsed.data);
    revalidatePath("/");
    revalidatePath("/invoices");
    revalidatePath(`/invoices/${id}`);
    revalidatePath(`/invoices/${id}/edit`);
    return { ok: true, id: updatedId };
  } catch (error) {
    console.error("updateInvoiceAction crashed:", error);
    return { ok: false, error: "Could not update invoice. Please try again." };
  }
}

export async function deleteInvoiceAction(
  id: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deleteInvoice(id);
    revalidatePath("/");
    revalidatePath("/invoices");
    revalidatePath(`/invoices/${id}`);
    return { ok: true };
  } catch (error) {
    console.error("deleteInvoiceAction crashed:", error);
    return { ok: false, error: "Could not delete invoice." };
  }
}

export async function updateInvoicePaymentAction(
  id: number,
  payment: {
    paymentStatus: PaymentStatus;
    paidAmount: number;
    paymentDate: string;
    paymentMethod: string;
    paymentNotes: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const parsed = PaymentUpdateSchema.safeParse(payment);
    if (!parsed.success) {
      console.error("Validation failed for updatePayment:", parsed.error);
      return { ok: false, error: "Invalid payment data provided." };
    }
    await updateInvoicePayment(id, parsed.data);
    revalidatePath("/");
    revalidatePath("/invoices");
    revalidatePath(`/invoices/${id}`);
    return { ok: true };
  } catch (error) {
    console.error("updateInvoicePaymentAction crashed:", error);
    return { ok: false, error: "Could not update payment details." };
  }
}
