export default function InvoicesLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header Skeleton */}
      <header className="page-heading flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 pb-4">
        <div>
          <div className="h-8 w-44 rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-80 rounded bg-zinc-100" />
        </div>
        <div className="h-10 w-28 rounded bg-zinc-900/10" />
      </header>

      {/* Filter Form Skeleton */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="h-11 flex-1 rounded-lg bg-zinc-100" />
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-11 w-36 rounded-lg bg-zinc-50 border border-zinc-200" />
            <div className="h-11 w-24 rounded-lg bg-zinc-900/10" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="border-b border-zinc-200 px-4 py-3"><div className="h-4 w-12 rounded bg-zinc-200" /></th>
                <th className="border-b border-zinc-200 px-4 py-3"><div className="h-4 w-10 rounded bg-zinc-200" /></th>
                <th className="border-b border-zinc-200 px-4 py-3"><div className="h-4 w-14 rounded bg-zinc-200" /></th>
                <th className="border-b border-zinc-200 px-4 py-3"><div className="h-4 w-12 rounded bg-zinc-200" /></th>
                <th className="border-b border-zinc-200 px-4 py-3"><div className="h-4 w-12 rounded bg-zinc-200" /></th>
                <th className="border-b border-zinc-200 px-4 py-3 text-right"><div className="h-4 w-10 rounded bg-zinc-200 ml-auto" /></th>
                <th className="border-b border-zinc-200 px-4 py-3 text-center"><div className="h-4 w-14 rounded bg-zinc-200 mx-auto" /></th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td className="border-b border-zinc-100 px-4 py-4"><div className="h-4 w-28 rounded bg-zinc-200" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4"><div className="h-4 w-20 rounded bg-zinc-100" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4"><div className="h-4 w-24 rounded bg-zinc-100" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4"><div className="h-4 w-32 rounded bg-zinc-100" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4"><div className="h-4 w-28 rounded bg-zinc-100" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4 text-right"><div className="h-4 w-16 rounded bg-zinc-200 ml-auto" /></td>
                  <td className="border-b border-zinc-100 px-4 py-4 text-center"><div className="h-5 w-16 rounded-full bg-zinc-200 mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
