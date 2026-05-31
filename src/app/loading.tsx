export default function Loading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <header className="page-heading border-b border-zinc-200 pb-4">
        <div className="h-8 w-48 rounded bg-zinc-200" />
        <div className="mt-2 h-4 w-96 rounded bg-zinc-100" />
      </header>

      <div className="space-y-6">
        {/* Metrics Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm">
              <div className="h-3 w-16 rounded bg-zinc-200" />
              <div className="mt-3 h-7 w-28 rounded bg-zinc-300" />
              <div className="mt-2 h-3.5 w-32 rounded bg-zinc-100" />
            </div>
          ))}
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="border-b border-zinc-100 pb-3 mb-4">
            <div className="h-4.5 w-44 rounded bg-zinc-200" />
            <div className="mt-1 h-3 w-64 rounded bg-zinc-100" />
          </div>
          <div className="h-48 w-full rounded bg-zinc-100/50" />
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Invoices Skeleton */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <div className="h-5 w-32 rounded bg-zinc-200" />
              <div className="h-3.5 w-24 rounded bg-zinc-100" />
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm p-4">
              <div className="space-y-4">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="space-y-1.5">
                      <div className="h-4.5 w-28 rounded bg-zinc-200" />
                      <div className="h-3 w-20 rounded bg-zinc-100" />
                    </div>
                    <div className="h-4.5 w-48 rounded bg-zinc-200" />
                    <div className="h-5 w-16 rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            {/* Quick Actions Skeleton */}
            <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm">
              <div className="h-4.5 w-36 rounded bg-zinc-200" />
              <div className="mt-4 space-y-3">
                <div className="h-10 w-full rounded bg-zinc-900/10" />
                <div className="h-10 w-full rounded bg-zinc-100" />
                <div className="h-10 w-full rounded bg-zinc-100" />
              </div>
            </div>

            {/* Top Customers Skeleton */}
            <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm">
              <div className="h-4.5 w-32 rounded bg-zinc-200" />
              <div className="mt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-zinc-200" />
                      <div className="h-4 w-24 rounded bg-zinc-100" />
                    </div>
                    <div className="h-4 w-16 rounded bg-zinc-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}