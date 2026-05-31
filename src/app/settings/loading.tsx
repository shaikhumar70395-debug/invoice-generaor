export default function SettingsLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <header className="page-heading border-b border-zinc-200 pb-4">
        <div className="h-8 w-40 rounded bg-zinc-200" />
        <div className="mt-2 h-4 w-72 rounded bg-zinc-100" />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column — Profile */}
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="h-5 w-36 rounded bg-zinc-200" />
            <div className="space-y-3 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-24 rounded bg-zinc-200/60" />
                  <div className="h-10 w-full rounded bg-zinc-100" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="h-5 w-28 rounded bg-zinc-200" />
            <div className="space-y-3 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-20 rounded bg-zinc-200/60" />
                  <div className="h-10 w-full rounded bg-zinc-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Bank & Logo & Backup */}
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="h-5 w-32 rounded bg-zinc-200" />
            <div className="space-y-3 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3.5 w-24 rounded bg-zinc-200/60" />
                  <div className="h-10 w-full rounded bg-zinc-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Logo Section */}
          <div className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="h-5 w-24 rounded bg-zinc-200" />
            <div className="mt-3 flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-zinc-200" />
              <div className="h-10 w-32 rounded-lg bg-zinc-100" />
            </div>
          </div>

          {/* Safety Backup */}
          <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-sm space-y-3">
            <div className="h-5 w-40 rounded bg-rose-100" />
            <div className="h-3.5 w-64 rounded bg-zinc-100" />
            <div className="h-10 w-full rounded bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
