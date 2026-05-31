"use client";

import { formatMoney } from "@/lib/format";

type Bucket = {
  label: string;
  amount: number;
  count: number;
};

type Props = {
  buckets: Bucket[];
};

const BUCKET_COLORS = ["#f59e0b", "#f97316", "#ef4444", "#9f1239"];

export function AgingChart({ buckets }: Props) {
  const maxAmount = Math.max(...buckets.map((b) => b.amount), 1);
  const total = buckets.reduce((s, b) => s + b.amount, 0);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <span className="text-2xl">✅</span>
        <p className="mt-2 text-sm font-medium text-zinc-600">No overdue invoices</p>
        <p className="text-xs text-zinc-400">All payments are on time</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {buckets.map((bucket, i) => {
        const pct = maxAmount > 0 ? (bucket.amount / maxAmount) * 100 : 0;
        const color = BUCKET_COLORS[i] ?? "#6b7280";
        return (
          <div key={bucket.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-zinc-700">{bucket.label}</span>
              <div className="flex items-center gap-2">
                {bucket.count > 0 && (
                  <span className="text-zinc-400">{bucket.count} inv</span>
                )}
                <span
                  className="font-semibold tabular-nums"
                  style={{ color }}
                >
                  {bucket.amount > 0 ? formatMoney(bucket.amount) : "—"}
                </span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: color,
                  opacity: bucket.amount === 0 ? 0.2 : 1,
                }}
              />
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-[10px] text-zinc-400">
        Total overdue: <span className="font-semibold text-zinc-600">{formatMoney(total)}</span>
      </p>
    </div>
  );
}
