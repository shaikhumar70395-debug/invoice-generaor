import { SavedInvoiceView } from "@/components/SavedInvoiceView";
import { getInvoiceForPreview } from "@/lib/invoices";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SavedInvoicePage({ params }: Props) {
  const { id } = await params;
  const invoiceId = Number(id);
  if (!Number.isInteger(invoiceId)) notFound();

  const invoice = await getInvoiceForPreview(invoiceId);
  if (!invoice) notFound();

  return (
    <SavedInvoiceView
      id={invoiceId}
      seller={invoice.seller}
      draft={invoice.draft}
      totals={invoice.totals}
      initialPayment={invoice.payment}
    />
  );
}
