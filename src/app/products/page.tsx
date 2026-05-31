import { ProductsManager } from "@/components/ProductsManager";
import { listProducts } from "@/lib/presets";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const products = await listProducts(query);

  return (
    <div className="space-y-5">
      <header className="page-heading border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Product Presets
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Manage saved product presets (description, HSN/SAC, units, default rates, and GST taxes) to prefill invoice lines instantly.
        </p>
      </header>
      <ProductsManager initialProducts={products} initialQuery={query} />
    </div>
  );
}
