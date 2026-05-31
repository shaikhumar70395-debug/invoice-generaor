import assert from "node:assert/strict";
import { createSampleInvoiceDraft } from "../src/lib/defaults";
import { calculateInvoiceTotals } from "../src/lib/gst";
import {
  getFinancialYear,
  getNextInvoiceNumber,
} from "../src/lib/invoice-number";

const totals = calculateInvoiceTotals(createSampleInvoiceDraft());

assert.equal(totals.subtotal, 33000);
assert.equal(totals.cgstAmount, 825);
assert.equal(totals.sgstAmount, 825);
assert.equal(totals.igstAmount, 0);
assert.equal(totals.roundOff, 0);
assert.equal(totals.grandTotal, 34650);

assert.equal(getFinancialYear(new Date("2026-03-31T00:00:00")), "25-26");
assert.equal(getFinancialYear(new Date("2026-04-01T00:00:00")), "26-27");
assert.equal(getNextInvoiceNumber("ECMUM", "26-27", 105), "ECMUM/26-27/106");

const editedDraft = createSampleInvoiceDraft();
editedDraft.lines[0] = {
  ...editedDraft.lines[0],
  quantity: 2,
  rate: 1000,
  gstRatePercent: 18,
};
editedDraft.taxMode = "inter";
const editedTotals = calculateInvoiceTotals(editedDraft);
assert.equal(editedDraft.meta.invoiceNumber, "ECMUM/26-27/105");
assert.equal(editedTotals.subtotal, 2000);
assert.equal(editedTotals.cgstAmount, 0);
assert.equal(editedTotals.sgstAmount, 0);
assert.equal(editedTotals.igstAmount, 360);
assert.equal(editedTotals.grandTotal, 2360);

console.log(
  "golden tests ok: total 34650, FY boundary, next invoice number, edit totals",
);
