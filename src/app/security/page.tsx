import { checkSecuritySetup } from "@/app/actions/auth";
import { SecuritySettingsForm } from "@/components/SecuritySettingsForm";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
  const securityInfo = await checkSecuritySetup();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <header className="page-heading border-b border-zinc-200 pb-4 mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Security settings
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Manage your application access and authentication preferences.
          </p>
        </header>
        <SecuritySettingsForm currentAuthType={securityInfo.authType} />
      </div>
    </div>
  );
}
