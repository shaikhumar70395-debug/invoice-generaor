"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { InvoixyLogo } from "@/components/InvoixyLogo";

import { IconHome, IconDocument, IconCopy, IconUsers, IconBox, IconSettings, IconLock, IconLogout, IconPlus } from "./ui/icons";

const navGroups = [
  {
    label: "Main",
    links: [
      { href: "/", label: "Dashboard", exact: true, icon: IconHome },
      { href: "/invoices/new", label: "New invoice", exact: true, icon: IconPlus },
      { href: "/invoices", label: "History", exact: true, icon: IconDocument },
    ]
  },
  {
    label: "Management",
    links: [
      { href: "/customers", label: "Customers", exact: false, icon: IconUsers },
      { href: "/products", label: "Products", exact: false, icon: IconBox },
    ]
  },
  {
    label: "Account",
    links: [
      { href: "/settings", label: "Seller", exact: false, icon: IconSettings },
      { href: "/security", label: "Security", exact: false, icon: IconLock },
    ]
  }
];

const allLinks = navGroups.flatMap(g => g.links);

export function AppNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav shadow-[0_4px_24px_rgba(0,0,0,0.02)] no-print">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <InvoixyLogo iconSize={30} />
          </Link>

          {/* Desktop Navigation */}
          {pathname !== "/login" && (
            <div className="hidden md:flex items-center gap-4">
              <nav className="flex gap-1" aria-label="Main">
                {allLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    (!link.exact && pathname.startsWith(`${link.href}/`));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200 ${
                        active
                          ? "bg-indigo-50 text-[#4318ff]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="h-4 w-px bg-slate-300 mx-1" aria-hidden="true" />
              
              <button
                onClick={async () => {
                  const { logout } = await import("@/app/actions/auth");
                  await logout();
                }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {pathname !== "/login" && (
            <button
              type="button"
              className="rounded-md p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {pathname !== "/login" && isOpen && (
        <div 
          className="fixed inset-0 z-[9999] md:hidden animate-fade-in flex flex-col bg-white"
        >
          {/* Overlay Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center">
              <InvoixyLogo iconSize={28} />
            </div>
            <button
              type="button"
              className="rounded-full p-2 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto" aria-label="Mobile Main">
            {navGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-1.5">
                <p className="px-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                  {group.label}
                </p>
                {group.links.map((link) => {
                  const active =
                    pathname === link.href ||
                    (!link.exact && pathname.startsWith(`${link.href}/`));
                  
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 rounded-xl px-4 py-2.5 text-[15px] font-bold transition-all duration-200 ${
                        active
                          ? "bg-indigo-50 text-[#4318ff]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className={`h-[18px] w-[18px] ${active ? "text-[#4318ff]" : "text-slate-400"}`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
            
            <div className="mt-auto pt-6 flex flex-col gap-2">
              <div className="h-px w-full bg-slate-100 mb-2" aria-hidden="true" />
              <button
                onClick={async () => {
                  const { logout } = await import("@/app/actions/auth");
                  setIsOpen(false);
                  await logout();
                }}
                className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-[15px] font-bold text-red-500 transition-colors hover:bg-red-50"
              >
                <IconLogout className="h-[18px] w-[18px]" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
