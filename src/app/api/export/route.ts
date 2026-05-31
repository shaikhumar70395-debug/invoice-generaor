import { listInvoicesForExport } from "@/lib/invoices";

export const dynamic = "force-dynamic";

function escapeCSV(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export async function GET() {
  try {
    const invoices = await listInvoicesForExport();

    const headers = [
      "Invoice Number",
      "Invoice Date",
      "Buyer Name",
      "Buyer GSTIN",
      "Buyer State",
      "Tax Mode",
      "Default GST Rate (%)",
      "Total Quantity",
      "Subtotal",
      "CGST Amount",
      "SGST Amount",
      "IGST Amount",
      "Round Off",
      "Grand Total",
      "Payment Status",
      "Paid Amount",
    ];

    const rows = invoices.map((inv) => [
      inv.invoiceNumber,
      inv.invoiceDate,
      inv.buyerName,
      inv.buyerGstin,
      `${inv.buyerStateName} (${inv.buyerStateCode})`,
      inv.taxMode,
      inv.gstRatePercent,
      inv.totalQuantity,
      inv.subtotal,
      inv.cgstAmount,
      inv.sgstAmount,
      inv.igstAmount,
      inv.roundOff,
      inv.grandTotal,
      inv.paymentStatus,
      inv.paidAmount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=gst_invoices_export.csv",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return new Response("Could not generate CSV report.", { status: 500 });
  }
}
