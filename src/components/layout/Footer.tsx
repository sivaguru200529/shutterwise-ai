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
              Understand Light. Master Your Camera. Capture Better. An AI-powered photography learning platform helping beginners transition from auto mode to creative manual control.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800/80 px-2.5 py-1 text-xs font-mono text-neutral-300 border border-neutral-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Phase 3: Knowledge Engine Active
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
                  Learning Catalog (6 Modules)
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  AI Photography Mentor
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-amber-400 transition-colors">
                  Exposure & EV Calculator
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-amber-400 transition-colors">
                  Camera Settings Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Learning Topics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Key Lessons
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/learn/iso" className="hover:text-amber-400 transition-colors">
                  ISO & Signal Gain
                </Link>
              </li>
              <li>
                <Link href="/learn/aperture" className="hover:text-amber-400 transition-colors">
                  Aperture & Depth of Field
                </Link>
              </li>
              <li>
                <Link href="/learn/shutter-speed" className="hover:text-amber-400 transition-colors">
                  Shutter Speed & Motion
                </Link>
              </li>
              <li>
                <Link href="/learn/exposure-triangle" className="hover:text-amber-400 transition-colors">
                  The Exposure Triangle
                </Link>
              </li>
              <li>
                <Link href="/learn/lighting-fundamentals" className="hover:text-amber-400 transition-colors">
                  Lighting Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/learn/photography-troubleshooting" className="hover:text-amber-400 transition-colors">
                  10-Point Troubleshooting
                </Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Budget Notice */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Architecture & Transparency
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-400">
              Built with Next.js App Router, Tailwind CSS, and Google Gemini 3.5 Flash Lite. Developed with ₹0 API budget and 100% free-tier verified models.
            </p>
            <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-2.5 text-[11px] font-mono text-neutral-400">
              Explain the *Why*, not just the *What*.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-neutral-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} ShutterWise AI. All educational content strictly grounded in optical physics.</p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-neutral-400 transition-colors">
              Knowledge Hub
            </Link>
            <span>•</span>
            <Link href="/chat" className="hover:text-neutral-400 transition-colors">
              AI Mentor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
