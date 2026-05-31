import { DashboardView } from "@/components/DashboardView";
import { getDashboardStats } from "@/lib/invoices";
import { isLocalDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stats = await getDashboardStats();
  const isLocal = isLocalDatabase();

  return (
    <div className="py-2 sm:py-6">
      <DashboardView stats={stats} isLocal={isLocal} />
    </div>
  );
}
