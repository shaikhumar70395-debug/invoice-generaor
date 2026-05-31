import { InvoiceWorkspace } from "@/components/InvoiceWorkspace";
import { getInvoiceForPreview } from "@/lib/invoices";
import { listCustomers, listProducts } from "@/lib/presets";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;
  const invoiceId = Number(id);
  if (!Number.isInteger(invoiceId)) notFound();

  const [invoice, customers, products] = await Promise.all([
    getInvoiceForPreview(invoiceId),
    listCustomers(),
    listProducts(),
  ]);

  if (!invoice) notFound();

  return (
    <div className="space-y-5">
      <header className="page-heading border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Edit invoice
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Update invoice details while keeping the original invoice number.
        </p>
      </header>
      <InvoiceWorkspace
        seller={invoice.seller}
        initialDraft={invoice.draft}
        customers={customers}
        products={products}
        mode="edit"
        invoiceId={invoiceId}
      />
    </div>
  );
}
