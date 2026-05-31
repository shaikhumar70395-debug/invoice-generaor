"use client";

import { useState, useTransition } from "react";
import { setupSecurity, login } from "@/app/actions/auth";

export default function LoginForm({ isSetup, authType }: { isSetup: boolean; authType: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  // For setup
  const [selectedAuthType, setSelectedAuthType] = useState(authType);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const action = isSetup ? login : setupSecurity;
      if (!isSetup) {
        formData.set("authType", selectedAuthType);
      }
      const res = await action(formData);
      if (res?.error) {
        setError(res.error);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md glass-panel p-8 rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-indigo-400"></div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {isSetup ? "Welcome Back" : "Security Setup"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isSetup ? "Please enter your credential to access the dashboard." : "Set up your initial PIN or password."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}

        {!isSetup && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-900">Authentication Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="authTypeToggle"
                  value="PIN"
                  checked={selectedAuthType === "PIN"}
                  onChange={() => setSelectedAuthType("PIN")}
                  className="text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span className="text-sm text-slate-700 font-medium">Numeric PIN</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="authTypeToggle"
                  value="PASSWORD"
                  checked={selectedAuthType === "PASSWORD"}
                  onChange={() => setSelectedAuthType("PASSWORD")}
                  className="text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span className="text-sm text-slate-700 font-medium">Text Password</span>
              </label>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="credential" className="text-sm font-medium text-slate-900">
            {isSetup ? (authType === "PIN" ? "PIN" : "Password") : (selectedAuthType === "PIN" ? "Create PIN" : "Create Password")}
          </label>
          <input
            id="credential"
            name="credential"
            type={isSetup && authType === "PIN" || (!isSetup && selectedAuthType === "PIN") ? "password" : "password"}
            inputMode={isSetup && authType === "PIN" || (!isSetup && selectedAuthType === "PIN") ? "numeric" : "text"}
            required
            autoFocus
            className="w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
            placeholder={isSetup && authType === "PIN" || (!isSetup && selectedAuthType === "PIN") ? "••••" : "••••••••"}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-primary-500 hover:to-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
        >
          {isPending ? "Please wait..." : (isSetup ? "Login" : "Save & Login")}
        </button>
      </form>
    </div>
  );
}
