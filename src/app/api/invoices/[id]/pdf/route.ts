import { getInvoiceForPreview } from "@/lib/invoices";
import { renderInvoicePdf } from "@/lib/pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{ id: string }>;
};

function safeFilePart(value: string) {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function buildFilename(invoiceNumber: string, buyerName: string) {
  const invoice = safeFilePart(invoiceNumber) || "invoice";
  const buyer = safeFilePart(buyerName);
  return buyer ? `${invoice}-${buyer}.pdf` : `${invoice}.pdf`;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const invoiceId = Number(id);
  if (!Number.isInteger(invoiceId)) {
    return new Response("Invalid invoice id.", { status: 400 });
  }

  const invoice = await getInvoiceForPreview(invoiceId);
  if (!invoice) {
    return new Response("Invoice not found.", { status: 404 });
  }

  try {
    const pdf = await renderInvoicePdf(invoice);
    const filename = buildFilename(
      invoice.draft.meta.invoiceNumber,
      invoice.draft.buyer.name,
    );

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("PDF generation failed", error);
    return new Response("Could not generate PDF.", { status: 500 });
  }
}
