"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const apertureOptions = [
  "f/1.4", "f/1.8", "f/2.0", "f/2.8", "f/4.0", "f/5.6", "f/8.0", "f/11", "f/16", "f/22"
];

const shutterOptions = [
  "1/4000s", "1/2000s", "1/1000s", "1/500s", "1/250s", "1/125s", "1/60s", "1/30s", "1/15s", "1/8s", "1/4s", "1/2s", "1s", "2s"
];

const isoOptions = [
  "ISO 50", "ISO 100", "ISO 200", "ISO 400", "ISO 800", "ISO 1600", "ISO 3200", "ISO 6400", "ISO 12800"
];

export default function CalculatorPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <PageHeader
        badge="Phase 4 Optical Tooling Preview"
        title="Exposure & EV Calculator"
        description="Compute standard Exposure Values (EV100), evaluate scene luminance, and explore equivalent reciprocal camera settings."
        statusNotice={{
          label: "Phase 1 Interface Preview — Calculation Engine Offline",
          message:
            "This interface demonstrates the input controls and optical parameter layout for the upcoming Exposure Calculator. Deterministic optical math and reciprocity calculations will be implemented in Phase 4. The Calculate button is deliberately non-functional to prevent fabricated results.",
          type: "info",
        }}
      />

      {/* Calculator Workspace */}
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Form (Disabled/Preview state) */}
          <div className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs">
                  EV
                </span>
                Camera Parameter Controls
              </h2>
              <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-mono text-amber-400/90 border border-neutral-700">
                Phase 1 Preview
              </span>
            </div>

            <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* 1. Aperture Selector */}
              <div>
                <label htmlFor="aperture-select" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Aperture (f-number)
                </label>
                <div className="mt-2">
                  <select
                    id="aperture-select"
                    defaultValue="f/2.8"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {apertureOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Controls light volume and depth of field (lower f-stop = wider opening).
                </p>
              </div>

              {/* 2. Shutter Speed Selector */}
              <div>
                <label htmlFor="shutter-select" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Shutter Speed (seconds)
                </label>
                <div className="mt-2">
                  <select
                    id="shutter-select"
                    defaultValue="1/500s"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {shutterOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Controls exposure time and motion blur (faster = freezes action).
                </p>
              </div>

              {/* 3. ISO Sensitivity Selector */}
              <div>
                <label htmlFor="iso-select" className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  ISO Sensitivity
                </label>
                <div className="mt-2">
                  <select
                    id="iso-select"
                    defaultValue="ISO 100"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:border-amber-500 focus:outline-none"
                  >
                    {isoOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">
                  Sensor amplification factor (ISO 100 is standard base reference).
                </p>
              </div>

              {/* Calculate Button (Disabled state) */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-800 border border-neutral-700 py-3.5 px-4 text-sm font-semibold text-neutral-400 cursor-not-allowed opacity-75"
                >
                  <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Calculate EV100 & Reciprocity (Disabled in Phase 1)</span>
                </button>
                <p className="mt-2 text-center text-[11px] font-mono text-neutral-400">
                  Optical calculation engine will be connected in Phase 4.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column: Result Placeholder & Explanation */}
          <div className="lg:col-span-5 space-y-6">
            {/* Result Placeholder Card */}
            <div className="rounded-2xl border border-dashed border-neutral-800 bg-[#161619]/60 p-6 sm:p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.25 2.25M9 7.5l3-3 2.25 2.25" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-neutral-200">
                Calculation Output Area
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Once Phase 4 is implemented, this module will output the exact Exposure Value ($EV_{100}$), equivalent exposure table, and recommended real-world lighting scenarios.
              </p>
              <div className="mt-5 rounded-lg border border-neutral-800 bg-neutral-900/80 p-3 text-xs font-mono text-neutral-400">
                Result state: <span className="text-amber-400">Awaiting Phase 4 Engine</span>
              </div>
            </div>

            {/* Educational Optical Guide */}
            <div className="rounded-2xl border border-neutral-800 bg-[#161619] p-6 text-sm text-neutral-300">
              <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
                <span className="text-amber-500">§</span>
                Standard Optical Formula
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                Standard Exposure Value at ISO 100 ($EV_{100}$) is calculated deterministically from relative aperture ($N$) and shutter time ($t$ in seconds):
              </p>

              <div className="mt-3 rounded-lg bg-neutral-950 p-3 font-mono text-xs text-amber-300 border border-neutral-800 text-center">
                EV100 = log2(N² / t)
              </div>

              <div className="mt-4 space-y-2 text-xs text-neutral-400">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>N = f-number</strong>: Lens aperture diaphragm value (e.g. 2.8, 5.6).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>t = shutter time</strong>: Exposure duration in fractional or whole seconds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Reciprocity</strong>: Changing aperture by 1 stop and shutter by 1 stop keeps total light volume constant.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

