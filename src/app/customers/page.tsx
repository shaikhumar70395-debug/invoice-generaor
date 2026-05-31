import { CustomersManager } from "@/components/CustomersManager";
import { listCustomers } from "@/lib/presets";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function CustomersPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const customers = await listCustomers(query);

  return (
    <div className="space-y-5">
      <header className="page-heading border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Customer Presets
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Manage saved customer profiles to prefill billing and tax information when creating new invoices.
        </p>
      </header>
      <CustomersManager initialCustomers={customers} initialQuery={query} />
    </div>
  );
}
