import { amountInWords } from "@/lib/amount-in-words";
import { roundMoney } from "@/lib/format";
import type {
  InvoiceDraft,
  InvoiceLineComputed,
  InvoiceLineInput,
  InvoiceTaxBreakup,
  InvoiceTotals,
  SellerProfile,
  TaxMode,
} from "@/lib/types";

function computeLine(
  line: InvoiceLineInput,
  slNo: number,
  fallbackGstRatePercent: number,
  taxMode: TaxMode,
): InvoiceLineComputed {
  const qty = Number(line.quantity) || 0;
  const rate = Number(line.rate) || 0;
  const disc = Number(line.discountPercent) || 0;
  const amount = roundMoney(qty * rate * (1 - disc / 100));
  const gstRatePercent =
    Number.isFinite(Number(line.gstRatePercent)) && Number(line.gstRatePercent) >= 0
      ? Number(line.gstRatePercent)
      : fallbackGstRatePercent;
  const halfRate = gstRatePercent / 2;
  const cgstAmount =
    taxMode === "intra" ? roundMoney((amount * halfRate) / 100) : 0;
  const sgstAmount =
    taxMode === "intra" ? roundMoney((amount * halfRate) / 100) : 0;
  const igstAmount =
    taxMode === "inter" ? roundMoney((amount * gstRatePercent) / 100) : 0;

  return {
    ...line,
    gstRatePercent,
    slNo,
    amount,
    cgstAmount,
    sgstAmount,
    igstAmount,
  };
}

export function inferTaxMode(
  sellerStateCode: string,
  buyerStateCode: string,
): TaxMode {
  const seller = sellerStateCode.trim();
  const buyer = buyerStateCode.trim();
  if (!seller || !buyer) return "intra";
  return seller === buyer ? "intra" : "inter";
}

export function calculateInvoiceTotals(
  draft: Pick<
    InvoiceDraft,
    "lines" | "taxMode" | "gstRatePercent" | "roundOffEnabled"
  >,
): InvoiceTotals {
  const defaultGstRate = Number(draft.gstRatePercent) || 0;
  const lines = draft.lines.map((line, index) =>
    computeLine(line, index + 1, defaultGstRate, draft.taxMode),
  );
  const subtotal = roundMoney(
    lines.reduce((sum, line) => sum + line.amount, 0),
  );
  const totalQuantity = roundMoney(
    lines.reduce((sum, line) => sum + (Number(line.quantity) || 0), 0),
  );

  const cgstAmount = roundMoney(
    lines.reduce((sum, line) => sum + line.cgstAmount, 0),
  );
  const sgstAmount = roundMoney(
    lines.reduce((sum, line) => sum + line.sgstAmount, 0),
  );
  const igstAmount = roundMoney(
    lines.reduce((sum, line) => sum + line.igstAmount, 0),
  );

  const breakupMap = new Map<number, InvoiceTaxBreakup>();
  for (const line of lines) {
    const existing =
      breakupMap.get(line.gstRatePercent) ??
      ({
        gstRatePercent: line.gstRatePercent,
        taxableAmount: 0,
        cgstRate: draft.taxMode === "intra" ? line.gstRatePercent / 2 : 0,
        sgstRate: draft.taxMode === "intra" ? line.gstRatePercent / 2 : 0,
        igstRate: draft.taxMode === "inter" ? line.gstRatePercent : 0,
        cgstAmount: 0,
        sgstAmount: 0,
        igstAmount: 0,
      } satisfies InvoiceTaxBreakup);
    existing.taxableAmount = roundMoney(existing.taxableAmount + line.amount);
    existing.cgstAmount = roundMoney(existing.cgstAmount + line.cgstAmount);
    existing.sgstAmount = roundMoney(existing.sgstAmount + line.sgstAmount);
    existing.igstAmount = roundMoney(existing.igstAmount + line.igstAmount);
    breakupMap.set(line.gstRatePercent, existing);
  }
  const taxBreakup = Array.from(breakupMap.values()).sort(
    (a, b) => a.gstRatePercent - b.gstRatePercent,
  );

  const rawTotal = roundMoney(subtotal + cgstAmount + sgstAmount + igstAmount);

  let roundOff = 0;
  let grandTotal = rawTotal;

  if (draft.roundOffEnabled) {
    grandTotal = Math.round(rawTotal);
    roundOff = roundMoney(grandTotal - rawTotal);
  }

  return {
    lines,
    totalQuantity,
    subtotal,
    cgstRate: taxBreakup.length === 1 ? taxBreakup[0].cgstRate : 0,
    sgstRate: taxBreakup.length === 1 ? taxBreakup[0].sgstRate : 0,
    igstRate: taxBreakup.length === 1 ? taxBreakup[0].igstRate : 0,
    cgstAmount,
    sgstAmount,
    igstAmount,
    roundOff,
    grandTotal,
    amountInWords: amountInWords(grandTotal),
    taxBreakup,
  };
}

export function applyTaxModeFromStates(
  draft: InvoiceDraft,
  seller: Pick<SellerProfile, "stateCode">,
): InvoiceDraft {
  const taxMode = inferTaxMode(seller.stateCode, draft.buyer.stateCode);
  return { ...draft, taxMode };
}
