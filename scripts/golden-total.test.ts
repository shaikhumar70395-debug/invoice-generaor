import assert from "node:assert/strict";
import { createSampleInvoiceDraft } from "../src/lib/defaults";
import { calculateInvoiceTotals } from "../src/lib/gst";
import {
  getFinancialYear,
  getNextInvoiceNumber,
} from "../src/lib/invoice-number";

const totals = calculateInvoiceTotals(createSampleInvoiceDraft());

assert.equal(totals.subtotal, 112000);
assert.equal(totals.cgstAmount, 10080);
assert.equal(totals.sgstAmount, 10080);
assert.equal(totals.igstAmount, 0);
assert.equal(totals.roundOff, 0);
assert.equal(totals.grandTotal, 132160);

assert.equal(getFinancialYear(new Date("2026-03-31T00:00:00")), "25-26");
assert.equal(getFinancialYear(new Date("2026-04-01T00:00:00")), "26-27");
assert.equal(getNextInvoiceNumber("ECMUM", "26-27", 105), "ECMUM/26-27/106");

const editedDraft = createSampleInvoiceDraft();
editedDraft.meta.invoiceNumber = "ECMUM/26-27/105";
editedDraft.lines[0] = {
  ...editedDraft.lines[0],
  quantity: 2,
  rate: 1000,
  gstRatePercent: 18,
};
editedDraft.taxMode = "inter";
const editedTotals = calculateInvoiceTotals(editedDraft);
assert.equal(editedDraft.meta.invoiceNumber, "ECMUM/26-27/105");
assert.equal(editedTotals.subtotal, 29000);
assert.equal(editedTotals.cgstAmount, 0);
assert.equal(editedTotals.sgstAmount, 0);
assert.equal(editedTotals.igstAmount, 5220);
assert.equal(editedTotals.grandTotal, 34220);

console.log(
  "golden tests ok: total 132160, FY boundary, next invoice number, edit totals",
);
