import { SellerSettingsForm } from "@/components/SellerSettingsForm";
import { getOrCreateSellerSettings } from "@/lib/seller";
import { isLocalDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const seller = await getOrCreateSellerSettings();
  const isLocal = isLocalDatabase();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <header className="page-heading border-b border-zinc-200 pb-4 mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Seller settings
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Company, bank, and branding details appear on every invoice. Configure once here.
          </p>
        </header>
        <SellerSettingsForm initial={seller} isLocal={isLocal} />
      </div>
    </div>
  );
}
