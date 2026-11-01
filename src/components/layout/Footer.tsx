import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-800/80 bg-[#0e0e10] text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-amber-500/30 bg-neutral-900">
                <svg
                  className="h-4 w-4 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
              </div>
              <span className="font-semibold text-neutral-100">
                ShutterWise <span className="text-amber-500 font-mono text-xs uppercase">AI</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-neutral-400 max-w-sm leading-relaxed">
              Understand Light. Master Your Camera. Capture Better. An AI-powered photography learning assistant helping beginners transition from auto mode to creative manual control.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-2.5 py-1 text-xs font-mono text-neutral-300 border border-neutral-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Phase 1: Frontend Foundation
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Platform
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-amber-400 transition-colors">
                  Exposure Calculator
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-amber-400 transition-colors">
                  Camera Settings Guide
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  AI Photography Tutor
                  <span className="text-[10px] text-amber-500/80 font-mono">(Coming Soon)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Learning Topics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Key Fundamentals
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  Aperture & Depth of Field
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  Shutter Speed & Motion
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  ISO & Sensor Grain
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  The Exposure Triangle
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-amber-400 transition-colors">
                  Lighting Basics
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Architectural Ethics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Architecture
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500">•</span> Zero-Cost Stack (₹0)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500">•</span> Next.js App Router
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500">•</span> Tailwind CSS v4
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500">•</span> Deterministic Math
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500">•</span> Privacy First (Local-Only)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400">
          <p>© 2026 ShutterWise AI. Understand Light. Master Your Camera. Capture Better.</p>
          <p className="mt-2 sm:mt-0 font-mono text-neutral-400">
            Phase 1 Completed • No AI APIs Connected
          </p>
        </div>
      </div>
    </footer>
  );
}

