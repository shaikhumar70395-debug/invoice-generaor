"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in a real production app
    console.error("Application crashed:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-5 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">
            Something went wrong!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            An unexpected error occurred. Don&apos;t worry, your data is safe.
          </p>
        </div>
        <div className="flex flex-col w-full gap-3 mt-4">
          <button
            onClick={() => reset()}
            className="w-full rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full rounded-md bg-white border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
