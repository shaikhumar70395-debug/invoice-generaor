import { InvoiceWorkspace } from "@/components/InvoiceWorkspace";
import { createDuplicateDraft, createNewInvoiceDraft } from "@/lib/invoices";
import { loadDraftFromDb } from "@/lib/draft-db";
import { listCustomers, listProducts } from "@/lib/presets";
import { getOrCreateSellerSettings } from "@/lib/seller";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ duplicate?: string }>;
};

export default async function NewInvoicePage({ searchParams }: Props) {
  const params = await searchParams;
  const duplicateId = params?.duplicate ? Number(params.duplicate) : null;

  const [seller, freshDraft, savedDbDraft, customers, products] =
    await Promise.all([
      getOrCreateSellerSettings(),
      duplicateId ? createDuplicateDraft(duplicateId) : createNewInvoiceDraft(),
      // Only load the DB draft when NOT duplicating — duplicate always starts fresh
      duplicateId ? Promise.resolve(null) : loadDraftFromDb(),
      listCustomers(),
      listProducts(),
    ]);

  if (!freshDraft) notFound();

  // If a DB draft exists, merge in the current invoice number from the fresh draft
  // (so the number stays correct even if the draft is old) then use it as initial state.
  const initialDraft = savedDbDraft
    ? {
        ...savedDbDraft,
        meta: {
          ...savedDbDraft.meta,
          invoiceNumber: freshDraft.meta.invoiceNumber,
        },
      }
    : freshDraft;

  return (
    <div className="space-y-5">
      <header className="page-heading border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          New invoice
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Enter buyer and line items on the left. The Tally-style preview on the right
          updates as you type.
          {savedDbDraft && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-200">
              ✦ Draft restored
            </span>
          )}
        </p>
      </header>
      <InvoiceWorkspace
        seller={seller}
        initialDraft={initialDraft}
        customers={customers}
        products={products}
      />
    </div>
  );
}
