import React from "react";
import { IconPlus } from "./icons";
import { Button } from "./Button";
import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="relative flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-slate-50/30 overflow-hidden border border-slate-100/50 p-6">
      
      {/* Ghost Skeletons Background */}
      <div className="absolute inset-0 w-full flex flex-col gap-4 p-6 pointer-events-none opacity-40 select-none">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.01)] border border-slate-100"
          >
            <div className="h-12 w-12 rounded-full bg-slate-100"></div>
            <div className="flex-1 space-y-3">
              <div className="h-3 w-1/3 rounded-full bg-slate-100"></div>
              <div className="h-2 w-1/5 rounded-full bg-slate-100"></div>
            </div>
            <div className="h-6 w-20 rounded-full bg-slate-100"></div>
          </div>
        ))}
      </div>

      {/* Gradient Fades to blend the skeletons */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 pointer-events-none"></div>

      {/* Glassmorphism Foreground Card */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center rounded-[32px] bg-white/60 backdrop-blur-xl p-12 text-center shadow-[0_8px_32px_rgb(0,0,0,0.04)] border border-white/80 ring-1 ring-slate-100/50">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm ring-8 ring-indigo-50/50">
          <svg
            className="h-12 w-12 text-[#4318ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>
        <h3 className="mb-3 text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
        <p className="mb-10 text-base font-medium text-slate-500 leading-relaxed max-w-lg">
          {description}
        </p>
        
        {actionLabel && (actionHref || onAction) && (
          actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary" className="px-8 py-3 text-base shadow-[0_4px_20px_rgba(67,24,255,0.3)] hover:scale-105 hover:bg-[#3412cc] transition-all">
                <IconPlus className="h-5 w-5 mr-1" />
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onAction} className="px-8 py-3 text-base shadow-[0_4px_20px_rgba(67,24,255,0.3)] hover:scale-105 hover:bg-[#3412cc] transition-all">
              <IconPlus className="h-5 w-5 mr-1" />
              {actionLabel}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
