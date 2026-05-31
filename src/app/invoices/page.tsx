import { formatDateDisplay, formatMoney } from "@/lib/format";
import { listInvoices } from "@/lib/invoices";
import { prisma } from "@/lib/prisma";
import { InvoiceFilterForm } from "@/components/InvoiceFilterForm";
import Link from "next/link";
import { IconCopy } from "@/components/ui/icons";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{
    q?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    buyer?: string;
    state?: string;
  }>;
};

function paymentBadgeClass(status: string) {
  if (status === "paid") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "part-paid") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

export default async function InvoicesPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params?.q ?? "";
  const startDate = params?.startDate ?? "";
  const endDate = params?.endDate ?? "";
  const status = params?.status ?? "all";
  const buyer = params?.buyer ?? "";
  const state = params?.state ?? "all";

  // Fetch distinct buyer states saved in database for dynamic dropdown filtering
  const statesResult = await prisma.invoice.findMany({
    select: { buyerStateName: true },
    distinct: ["buyerStateName"],
    where: { buyerStateName: { not: "" } },
  });
  const states = statesResult
    .map((r) => r.buyerStateName)
    .filter(Boolean)
    .sort();

  const invoices = await listInvoices({
    q,
    startDate,
    endDate,
    paymentStatus: status,
    buyerName: buyer,
    buyerStateName: state,
  });

  return (
    <div className="space-y-5">
      <header className="page-heading flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Invoice history
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Search saved invoices by number, buyer, GSTIN, or date.
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="rounded-md border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          New invoice
        </Link>
      </header>

      <InvoiceFilterForm states={states} />


      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        {invoices.length ? (
          <div className="space-y-4 p-4 md:p-6">
            {invoices.map((invoice) => {
              const todayIso = new Date().toISOString().slice(0, 10);
              const isOverdue =
                invoice.paymentStatus !== "paid" &&
                !!invoice.dueDate &&
                invoice.dueDate < todayIso;
              const outstanding = Math.max(
                0,
                invoice.grandTotal - invoice.paidAmount,
              );

              return (
                <article key={invoice.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="block truncate text-lg font-bold text-slate-900 hover:text-[#4318ff] transition-colors"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                      <p className="mt-1 truncate text-sm font-semibold text-slate-600">
                        {invoice.buyerName || "Unknown buyer"}
                      </p>
                      {invoice.buyerGstin ? (
                        <p className="mt-0.5 truncate font-mono text-[11px] text-slate-400">
                          GSTIN: {invoice.buyerGstin}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold capitalize ${paymentBadgeClass(invoice.paymentStatus)}`}
                    >
                      {invoice.paymentStatus}
                    </span>
                  </div>

                  <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <dt className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
                        Date
                      </dt>
                      <dd className="mt-1 font-semibold text-slate-700">
                        {formatDateDisplay(invoice.invoiceDate)}
                      </dd>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <dt className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
                        Due
                      </dt>
                      <dd
                        className={`mt-1 font-semibold ${
                          isOverdue ? "text-rose-600" : "text-slate-700"
                        }`}
                      >
                        {invoice.dueDate ? formatDateDisplay(invoice.dueDate) : "-"}
                        {isOverdue ? (
                          <span className="block mt-0.5 text-[10px] font-bold uppercase text-rose-600">
                            Overdue
                          </span>
                        ) : null}
                      </dd>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <dt className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
                        Total
                      </dt>
                      <dd className="mt-1 font-bold tabular-nums text-slate-900">
                        {formatMoney(invoice.grandTotal)}
                      </dd>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <dt className="font-bold text-[10px] uppercase tracking-wider text-slate-400">
                        Outstanding
                      </dt>
                      <dd
                        className={`mt-1 font-bold tabular-nums ${
                          outstanding > 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {formatMoney(outstanding)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-[#4318ff] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#3412cc]"
                    >
                      Open Invoice
                    </Link>
                    <Link
                      href={`/invoices/new?duplicate=${invoice.id}`}
                      className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#4318ff]"
                    >
                      <IconCopy className="h-4 w-4" />
                      Duplicate
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No invoices found"
            description="We couldn't find any invoices matching your search. Try adjusting the filters or create a new invoice."
            actionLabel="Create Invoice"
            actionHref="/invoices/new"
          />
        )}
      </div>
    </div>
  );
}
