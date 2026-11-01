"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Learn", href: "/learn" },
  { name: "Chat", href: "/chat", badge: "AI" },
  { name: "Calculator", href: "/calculator" },
  { name: "Camera Settings", href: "/recommendations" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#121212]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-95"
          aria-label="ShutterWise AI Home"
        >
          {/* Stylized Camera Aperture Icon */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-neutral-900 shadow-sm transition-transform group-hover:scale-105">
            <svg
              className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m14.31 8 5.74 9.94" />
              <path d="M9.69 8h11.48" />
              <path d="m7.38 12 5.74-9.94" />
              <path d="M9.69 16 3.95 6.06" />
              <path d="M14.31 16H2.83" />
              <path d="m16.62 12-5.74 9.94" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#121212]" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-neutral-100 sm:text-lg">
              ShutterWise <span className="text-amber-500 font-mono text-sm uppercase tracking-wider">AI</span>
            </span>
            <span className="hidden text-[10px] tracking-wider text-neutral-400 uppercase sm:block">
              Photography Assistant
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-neutral-800/80 text-amber-400"
                    : "text-neutral-300 hover:bg-neutral-800/40 hover:text-neutral-100"
                }`}
              >
                {item.name}
                {item.badge && (
                  <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono font-medium text-amber-400 border border-amber-500/20">
                    {item.badge}
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA button */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-neutral-950 transition-all hover:bg-amber-400 active:scale-95 shadow-sm"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-[#151517] px-4 pt-2 pb-6 md:hidden">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    active
                      ? "bg-neutral-800 text-amber-400 font-semibold"
                      : "text-neutral-300 hover:bg-neutral-800/50 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-xs font-mono font-medium text-amber-400 border border-amber-500/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/learn"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
              >
                Start Learning
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

