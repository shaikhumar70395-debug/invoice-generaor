import { checkSecuritySetup } from "@/app/actions/auth";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const securityInfo = await checkSecuritySetup();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mesh-animated px-4 py-12 sm:px-6 lg:px-8 relative z-0">
      <div className="mb-8 flex flex-col items-center z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-600 text-white shadow-xl shadow-primary-500/20">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
          Invoice Generator
        </h2>
      </div>

      <div className="z-10 w-full max-w-md">
        <LoginForm isSetup={securityInfo.isSetup} authType={securityInfo.authType} />
      </div>
    </div>
  );
}
