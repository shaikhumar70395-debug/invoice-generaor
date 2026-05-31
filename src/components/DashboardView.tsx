"use client";

import { formatMoney, formatDateDisplay } from "@/lib/format";
import Link from "next/link";
import { IconDocument, IconCopy } from "@/components/ui/icons";
import { RevenueChart } from "@/components/RevenueChart";
import { AgingChart } from "@/components/AgingChart";
import { EmptyState } from "@/components/ui/EmptyState";

type Props = {
  stats: {
    invoiceCount: number;
    totalBilled: number;
    totalCollected: number;
    outstanding: number;
    monthBilled: number;
    overdueCount: number;
    recentInvoices: Array<{
      id: number;
      invoiceNumber: string;
      invoiceDate: string;
      dueDate: string;
      buyerName: string;
      grandTotal: number;
      paidAmount: number;
      paymentStatus: string;
    }>;
    topCustomers: Array<{
      name: string;
      total: number;
    }>;
    monthlyRevenue: Array<{
      prefix: string;
      label: string;
      billed: number;
      collected: number;
    }>;
    agingBuckets: Array<{
      label: string;
      amount: number;
      count: number;
    }>;
  };
  isLocal?: boolean;
};

const statusColors: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-600",
  "part-paid": "bg-blue-50 text-blue-600",
  unpaid: "bg-orange-50 text-orange-500",
};

export function DashboardView({ stats, isLocal = true }: Props) {
  const todayIso = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6 pb-24 max-w-5xl mx-auto">
      {/* Header Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Good morning 👋</h1>
        <p className="text-base text-slate-600 mt-1 font-medium">Here's what's happening with your business.</p>
      </div>

      {/* Metrics Row (4 Columns on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-100">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-xs font-bold text-slate-700 tracking-wide uppercase truncate mr-1">Total Revenue</p>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
              <span className="text-sm sm:text-lg">📈</span>
            </div>
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tabular-nums tracking-tight mt-1 truncate">
            {formatMoney(stats.totalCollected)}
          </p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> Collected
          </p>
        </div>

        {/* Total Invoices */}
        <div className="rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-100">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-xs font-bold text-slate-700 tracking-wide uppercase truncate mr-1">Total Invoices</p>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
              <span className="text-sm sm:text-lg">📄</span>
            </div>
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tabular-nums tracking-tight mt-1 truncate">
            {stats.invoiceCount}
          </p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] font-bold text-indigo-600 flex items-center gap-1">
            <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> Generated
          </p>
        </div>

        {/* Outstanding */}
        <div className="rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-orange-100">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-xs font-bold text-slate-700 tracking-wide uppercase truncate mr-1">Outstanding</p>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
              <span className="text-sm sm:text-lg">⏳</span>
            </div>
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tabular-nums tracking-tight mt-1 truncate">
            {formatMoney(stats.outstanding)}
          </p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] font-bold text-orange-600 flex items-center gap-1">
            <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> Awaiting
          </p>
        </div>

        {/* Paid Amount */}
        <div className="rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-100">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <p className="text-[10px] sm:text-xs font-bold text-slate-700 tracking-wide uppercase truncate mr-1">Paid Amount</p>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0">
              <span className="text-sm sm:text-lg">💵</span>
            </div>
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tabular-nums tracking-tight mt-1 truncate">
            {formatMoney(stats.totalCollected)}
          </p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-[11px] font-bold text-emerald-600 flex items-center gap-1">
             <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> Total paid
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-extrabold text-slate-900">Revenue Overview</h3>
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">This Year</span>
          </div>
        </div>
        <RevenueChart data={stats.monthlyRevenue} />
      </div>

      {/* Recent Invoices List (Card-based) */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-8">
          <h3 className="text-base font-extrabold text-slate-900">Recent Invoices</h3>
          <Link
            href="/invoices"
            className="text-xs font-bold text-[#4318ff] hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="flex flex-col">
          {stats.recentInvoices.length > 0 ? (
            stats.recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50/80 transition-all duration-200 hover:-translate-y-0.5 border-b border-slate-100 last:border-b-0 group"
              >
                <div className="flex flex-col gap-1.5 mb-3 sm:mb-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 uppercase tracking-tight group-hover:text-[#4318ff] transition-colors">
                      {inv.buyerName || "Cash Customer"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="text-slate-400"># {inv.invoiceNumber}</span>
                    <span>&bull;</span>
                    <span>{formatDateDisplay(inv.invoiceDate)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                    {formatMoney(inv.grandTotal)}
                  </span>
                  
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
                      statusColors[inv.paymentStatus] || statusColors.unpaid
                    }`}
                  >
                    {inv.paymentStatus === "part-paid" ? "Part Paid" : inv.paymentStatus}
                  </span>

                  <div className="flex items-center gap-1 md:hidden md:group-hover:flex">
                     <Link
                        href={`/invoices/${inv.id}`}
                        className="p-2 text-slate-400 hover:bg-[#4318ff]/10 hover:text-[#4318ff] rounded-lg transition-colors"
                        title="View Invoice"
                      >
                        <IconDocument className="h-4 w-4" />
                     </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <EmptyState 
                 title="No invoices yet" 
                 description="You haven't generated any invoices. Create your first one to start tracking revenue." 
                 actionLabel="Create Invoice" 
                 actionHref="/invoices/new" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link 
          href="/invoices/new" 
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#4318ff] to-indigo-500 text-white shadow-[0_8px_30px_rgba(67,24,255,0.4)] hover:shadow-[0_12px_40px_rgba(67,24,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-slow border border-white/20"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

