"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root crash:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-zinc-50 antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm border border-zinc-200">
            <h1 className="text-xl font-bold text-zinc-900">Fatal Error</h1>
            <p className="mt-2 text-sm text-zinc-600">
              The application encountered an unrecoverable error at the root level.
            </p>
            <button
              onClick={() => reset()}
              className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors"
            >
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
