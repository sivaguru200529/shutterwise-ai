import Link from "next/link";
import { FeatureCard } from "@/components/ui/FeatureCard";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800/80 bg-gradient-to-b from-[#18181c] via-[#141416] to-[#121212] py-20 sm:py-28 lg:py-32">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#20202515_1px,transparent_1px),linear-gradient(to_bottom,#20202515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-medium text-amber-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                Photography Education Reimagined
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                Understand Your Camera.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  Capture with Confidence.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-neutral-300 max-w-2xl mx-auto lg:mx-0">
                Learn photography from the ground up. Understand exposure, master camera settings, and discover how light transforms your photographs — with clear, intuitive fundamentals instead of guesswork.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/learn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-neutral-950 transition-all hover:bg-amber-400 active:scale-95 shadow-md shadow-amber-500/10"
                >
                  Start Learning
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                <Link
                  href="/recommendations"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-base font-medium text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-800"
                >
                  Explore Photography Guides
                </Link>
              </div>

              {/* Quick stats/principles bar */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-neutral-800/80 pt-6 text-left">
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100">100%</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Free Learning (₹0)</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">3 Pillars</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Aperture • Shutter • ISO</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100">Explain Why</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Not just dials, but optics</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Photography Viewfinder Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-neutral-700/80 bg-[#16161a] p-4 shadow-2xl relative">
                {/* Simulated Camera Viewfinder */}
                <div className="relative aspect-[4/3] w-full rounded-xl border border-neutral-800 bg-[#0c0c0e] overflow-hidden flex flex-col justify-between p-4">
                  {/* Viewfinder corner brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/60" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/60" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/60" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/60" />

                  {/* Grid overlay (Rule of Thirds) */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                    <div className="border-r border-b border-neutral-400" />
                    <div className="border-r border-b border-neutral-400" />
                    <div className="border-b border-neutral-400" />
                    <div className="border-r border-b border-neutral-400" />
                    <div className="border-r border-b border-neutral-400" />
                    <div className="border-b border-neutral-400" />
                    <div className="border-r border-neutral-400" />
                    <div className="border-r border-neutral-400" />
                    <div />
                  </div>

                  {/* Top HUD */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AF-C [TRACKING]
                    </span>
                    <span className="text-neutral-400">RAW 14-BIT</span>
                    <span className="text-amber-400 font-semibold">EV +0.0</span>
                  </div>

                  {/* Center autofocus bracket */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-amber-500/50 bg-amber-500/5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-neutral-400 tracking-wider">
                      50mm • OPTICAL HARMONY
                    </span>
                  </div>

                  {/* Bottom Camera Settings Bar (The Exposure Triangle In Viewfinder) */}
                  <div className="relative z-10 rounded-lg bg-neutral-900/90 border border-neutral-800 p-2 text-center">
                    <div className="grid grid-cols-3 divide-x divide-neutral-800 text-xs font-mono">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Shutter</span>
                        <span className="font-bold text-amber-400">1/500s</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Aperture</span>
                        <span className="font-bold text-neutral-100">f/2.8</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">ISO</span>
                        <span className="font-bold text-neutral-100">200</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Viewfinder caption */}
                <div className="mt-3 flex items-center justify-between px-1 text-xs text-neutral-400 font-mono">
                  <span>Balanced Natural Exposure</span>
                  <span className="text-amber-500">EV100: 12.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
              Engineered for Complete Photographic Clarity
            </h2>
            <p className="mt-3 text-base text-neutral-300">
              Explore specialized modules crafted to eliminate confusion and turn complex camera mechanics into second nature.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. AI Photography Tutor */}
            <FeatureCard
              title="AI Photography Tutor"
              description="Ask specific questions about camera dials, exposure dilemmas, and composition. Powered by Gemini with structured troubleshooting."
              badge="Phase 2 Preview"
              isComingSoon={true}
              href="/chat"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-.84-.84c.18-.89.362-1.78.435-2.673C3.65 16.038 3 14.11 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              }
            />

            {/* 2. Exposure Triangle */}
            <FeatureCard
              title="The Exposure Triangle"
              description="Discover how ISO, Aperture, and Shutter Speed interact like balancing weights to govern light, depth, and motion blur."
              badge="Fundamental Guide"
              isComingSoon={false}
              href="/learn"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 21h20L12 3z" />
                </svg>
              }
            />

            {/* 3. Exposure Calculator */}
            <FeatureCard
              title="Exposure Calculator"
              description="Deterministic optical calculation of standard EV100 and equivalent exposure reciprocity without guesswork."
              badge="Phase 4 Preview"
              isComingSoon={false}
              href="/calculator"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              }
            />

            {/* 4. Camera Settings Guide */}
            <FeatureCard
              title="Camera Settings Guide"
              description="Pragmatic baseline starting configurations for Portraits, Landscapes, Street, Night, Sports, and Indoor scenes."
              badge="Ready to Explore"
              isComingSoon={false}
              href="/recommendations"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              }
            />

            {/* 5. Lighting Tutor */}
            <FeatureCard
              title="Lighting Tutor"
              description="Learn to read light quality: hard vs soft light, key directional angles (front, side, rim), and golden hour dynamics."
              badge="Phase 5 Planned"
              isComingSoon={true}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                </svg>
              }
            />

            {/* 6. Photography Troubleshooting */}
            <FeatureCard
              title="Photography Troubleshooting"
              description="Diagnose blurry photos, unwanted digital noise, washed-out highlights, and focus hunting with step-by-step logic."
              badge="Phase 3 Planned"
              isComingSoon={true}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 004.486-6.32l-3.27 3.27a1.5 1.5 0 01-2.121 0l-1.061-1.06a1.5 1.5 0 010-2.122l3.27-3.27A4.5 4.5 0 0012.7 6.471c-.118.58-.094 1.193.07 1.743" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Learning Topics Overview */}
      <section className="py-20 bg-[#161619] border-y border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
                Core Curriculum
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
                Master the Core Elements
              </h2>
              <p className="mt-2 text-base text-neutral-300">
                Understand the physical principles governing every photograph you capture.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              View Full Learning Catalog
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Topic 1: ISO */}
            <div className="rounded-xl border border-neutral-800 bg-[#121214] p-5">
              <span className="font-mono text-xs text-amber-400 font-semibold">ELEMENT 01</span>
              <h3 className="mt-2 text-lg font-bold text-neutral-100">ISO Sensitivity</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Measures sensor signal amplification. Lower ISO (100) yields clean, noise-free images; higher ISO (3200+) enables low-light shooting with digital grain trade-offs.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Baseline: ISO 100</span>
                <span className="text-amber-400/80">Signal Gain</span>
              </div>
            </div>

            {/* Topic 2: Aperture */}
            <div className="rounded-xl border border-neutral-800 bg-[#121214] p-5">
              <span className="font-mono text-xs text-amber-400 font-semibold">ELEMENT 02</span>
              <h3 className="mt-2 text-lg font-bold text-neutral-100">Aperture (f-stop)</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                The optical diaphragm opening. Wide apertures (f/1.8) let in abundant light and blur backgrounds; narrow apertures (f/11) keep front-to-back scenery sharp.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Controls: Depth of Field</span>
                <span className="text-amber-400/80">Light Volume</span>
              </div>
            </div>

            {/* Topic 3: Shutter Speed */}
            <div className="rounded-xl border border-neutral-800 bg-[#121214] p-5">
              <span className="font-mono text-xs text-amber-400 font-semibold">ELEMENT 03</span>
              <h3 className="mt-2 text-lg font-bold text-neutral-100">Shutter Speed</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                The time duration the sensor is exposed to light. Fast speeds (1/1000s) freeze erratic action; slow speeds (1/2s) introduce deliberate motion blur or light trails.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Controls: Motion</span>
                <span className="text-amber-400/80">Duration</span>
              </div>
            </div>

            {/* Topic 4: Exposure Triangle */}
            <div className="rounded-xl border border-neutral-800 bg-[#121214] p-5">
              <span className="font-mono text-xs text-amber-400 font-semibold">ELEMENT 04</span>
              <h3 className="mt-2 text-lg font-bold text-neutral-100">Exposure Triangle</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                The three controls exist in constant mathematical equilibrium. Changing one setting requires reciprocal compensation from another to preserve exposure balance.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Rule: Reciprocity</span>
                <span className="text-amber-400/80">Total Balance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
              The Learning Journey
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
              Three Simple Steps to Creative Freedom
            </h2>
            <p className="mt-3 text-base text-neutral-300">
              Transforming confusing technical numbers into confident photographic decisions.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-800 bg-[#161619]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-xl font-bold">
                01
              </div>
              <h3 className="mt-6 text-xl font-semibold text-neutral-100">
                Learn Photography Fundamentals
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Master the optical foundation: understand how light enters the lens, how apertures shape depth of field, and why shutter speeds define motion.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-800 bg-[#161619]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-xl font-bold">
                02
              </div>
              <h3 className="mt-6 text-xl font-semibold text-neutral-100">
                Understand Camera Settings
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Demystify camera dials and shooting modes. Learn when to choose Aperture Priority, Shutter Priority, or Manual mode based on the scene.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-800 bg-[#161619]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 font-mono text-xl font-bold">
                03
              </div>
              <h3 className="mt-6 text-xl font-semibold text-neutral-100">
                Practise and Improve Your Photos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Take your camera into the field with scenario baselines, troubleshoot common mistakes, and capture sharp, stunning images with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="border-t border-neutral-800/80 bg-gradient-to-r from-neutral-900 via-[#18181c] to-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Ready to Take Control of Your Camera?
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto">
            Step away from Auto mode. Start with the core exposure principles and build genuine creative control.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learn"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
            >
              Begin Learning Modules
            </Link>
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              Preview AI Tutor (Phase 2)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
