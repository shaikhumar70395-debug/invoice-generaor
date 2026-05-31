"use client";

import { useState, useTransition } from "react";
import { updateSecurity } from "@/app/actions/auth";

export function SecuritySettingsForm({ currentAuthType }: { currentAuthType: string }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [authType, setAuthType] = useState(currentAuthType || "PIN");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    formData.set("newAuthType", authType);

    startTransition(async () => {
      const res = await updateSecurity(formData);
      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else if (res?.success) {
        setMessage({ type: "success", text: res.success });
        (event.target as HTMLFormElement).reset();
      }
    });
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">Security Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        {message && (
          <div className={`rounded-md p-4 text-sm border ${message.type === "error" ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-900">Authentication Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="authTypeToggle"
                value="PIN"
                checked={authType === "PIN"}
                onChange={() => setAuthType("PIN")}
                className="text-zinc-900 focus:ring-zinc-900"
              />
              <span className="text-sm text-zinc-700">Numeric PIN</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="authTypeToggle"
                value="PASSWORD"
                checked={authType === "PASSWORD"}
                onChange={() => setAuthType("PASSWORD")}
                className="text-zinc-900 focus:ring-zinc-900"
              />
              <span className="text-sm text-zinc-700">Text Password</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="currentCredential" className="text-sm font-medium text-zinc-900">
            Current {currentAuthType === "PIN" ? "PIN" : "Password"}
          </label>
          <input
            id="currentCredential"
            name="currentCredential"
            type={currentAuthType === "PIN" ? "password" : "password"}
            inputMode={currentAuthType === "PIN" ? "numeric" : "text"}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="newCredential" className="text-sm font-medium text-zinc-900">
            New {authType === "PIN" ? "PIN" : "Password"}
          </label>
          <input
            id="newCredential"
            name="newCredential"
            type={authType === "PIN" ? "password" : "password"}
            inputMode={authType === "PIN" ? "numeric" : "text"}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:opacity-70 transition-colors"
        >
          {isPending ? "Updating..." : "Update Security"}
        </button>
      </form>
    </div>
  );
}
