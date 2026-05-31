import { listInvoicesForExport } from "@/lib/invoices";

export const dynamic = "force-dynamic";

function escapeCSV(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (
    str.includes(",") ||
    str.includes('"') ||
    str.includes("\n") ||
    str.includes("\r")
  ) {
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
      "Payment Status",
      "Line No",
      "Description",
      "HSN/SAC",
      "Quantity",
      "Unit",
      "Rate",
      "Discount %",
      "GST %",
      "Taxable Amount",
      "CGST Amount",
      "SGST Amount",
      "IGST Amount",
      "Invoice Grand Total",
    ];

    const rows = invoices.flatMap((inv) =>
      inv.lines.map((line) => [
        inv.invoiceNumber,
        inv.invoiceDate,
        inv.buyerName,
        inv.buyerGstin,
        inv.paymentStatus,
        line.lineOrder,
        line.description,
        line.hsnSac,
        line.quantity,
        line.unit,
        line.rate,
        line.discountPercent,
        line.gstRatePercent,
        line.amount,
        line.cgstAmount,
        line.sgstAmount,
        line.igstAmount,
        inv.grandTotal,
      ]),
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\r\n");

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          "attachment; filename=gst_invoice_lines_export.csv",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch {
    return new Response("Could not generate line CSV report.", { status: 500 });
  }
}
