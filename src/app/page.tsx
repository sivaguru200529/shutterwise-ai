import Link from "next/link";
import { FeatureCard } from "@/components/ui/FeatureCard";

export const metadata = {
  title: "ShutterWise AI — Understand Light. Master Your Camera. Capture Better.",
  description:
    "An AI-powered photography learning platform that explains camera settings, exposure, lighting, and photography techniques with plain-English optical physics.",
};

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
                Understand Light. Master Your Camera. Capture Better.
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                Master Manual Control.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  Explain the Why, Not Just the What.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-neutral-300 max-w-2xl mx-auto lg:mx-0">
                Transition from Auto mode with confidence. Discover how Aperture, Shutter Speed, and ISO interact in optical reciprocity, diagnose ruined photos in seconds, and learn with an AI mentor.
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
                  href="/chat"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-base font-medium text-neutral-200 transition-colors hover:border-amber-500/50 hover:bg-neutral-800 hover:text-amber-300"
                >
                  <svg className="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14.31 8 5.74 9.94" />
                    <path d="M9.69 8h11.48" />
                    <path d="m7.38 12 5.74-9.94" />
                  </svg>
                  Ask AI Mentor
                </Link>
              </div>

              {/* Quick stats/principles bar */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-neutral-800/80 pt-6 text-left">
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100">6 Modules</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Phase 3 Knowledge Hub</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">Gemini 3.5</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Live Photography Mentor</div>
                </div>
                <div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100">100% Free</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Zero-cost learning (₹0)</div>
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
                    <div className="border-r border-b border-neutral-400" />
                    <div className="border-r border-neutral-400" />
                    <div />
                  </div>

                  {/* Top HUD */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AF-C [EYE TRACKING]
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
                      50mm • APERTURE PRIORITY
                    </span>
                  </div>

                  {/* Bottom Camera Settings Bar (The Exposure Triangle In Viewfinder) */}
                  <div className="relative z-10 rounded-lg bg-neutral-900/90 border border-neutral-800 p-2 text-center">
                    <div className="grid grid-cols-3 divide-x divide-neutral-800 text-xs font-mono">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Aperture</span>
                        <span className="font-bold text-amber-400">f/2.8</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">Shutter</span>
                        <span className="font-bold text-sky-400">1/500s</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">ISO</span>
                        <span className="font-bold text-emerald-400">100</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Viewfinder caption */}
                <div className="mt-3 flex items-center justify-between px-1 text-xs text-neutral-400 font-mono">
                  <span>Daylight Portrait Equilibrium</span>
                  <span className="text-amber-500">EV100: 12.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Platforms Features Grid */}
      <section className="py-20 sm:py-24 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
              Platform Features
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
              Everything You Need to Master Photography
            </h2>
            <p className="mt-3 text-base text-neutral-300">
              From structured fundamentals and real-world presets to interactive tools and direct AI mentorship.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Knowledge Hub */}
            <FeatureCard
              title="Knowledge Hub"
              description="Six structured interactive modules covering ISO, Aperture, Shutter, Exposure Triangle, Lighting, and Troubleshooting."
              badge="Phase 3 Live"
              isComingSoon={false}
              href="/learn"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              }
            />

            {/* 2. AI Mentor */}
            <FeatureCard
              title="AI Photography Mentor"
              description="Ask specific questions about dials, lighting angles, or blurry photos. Powered by Gemini 3.5 with 6-part troubleshooting."
              badge="Live AI"
              isComingSoon={false}
              href="/chat"
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m14.31 8 5.74 9.94" />
                  <path d="M9.69 8h11.48" />
                  <path d="m7.38 12 5.74-9.94" />
                  <path d="M9.69 16 3.95 6.06" />
                  <path d="M14.31 16H2.83" />
                  <path d="m16.62 12-5.74 9.94" />
                </svg>
              }
            />

            {/* 3. Exposure Calculator */}
            <FeatureCard
              title="Optical Calculator"
              description="Calculate standard Exposure Values (EV100) and explore equivalent reciprocity settings across shutter and aperture."
              badge="Optical Math"
              isComingSoon={false}
              href="/calculator"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              }
            />

            {/* 4. Scenario Guide */}
            <FeatureCard
              title="Settings Guide"
              description="Field-ready starting baselines for portraits, landscapes, street, action sports, indoor events, and night photography."
              badge="Field Presets"
              isComingSoon={false}
              href="/recommendations"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Featured Photography Concepts Grid */}
      <section className="py-20 bg-[#161619] border-y border-neutral-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-500">
                Core Optical Pillars
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
                Explore the Foundations
              </h2>
              <p className="mt-2 text-base text-neutral-300">
                Click any pillar to jump directly into its dedicated lesson, diagrams, and quiz.
              </p>
            </div>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Explore All 6 Modules
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. ISO */}
            <Link
              href="/learn/iso"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 01</span>
                <span className="text-neutral-500">8 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                ISO & Sensor Signal Gain
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                How electronic amplification affects brightness, why high ISO causes digital noise, and when to stick to Base ISO.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Base: ISO 100</span>
                <span className="text-amber-400">Learn ISO →</span>
              </div>
            </Link>

            {/* 2. Aperture */}
            <Link
              href="/learn/aperture"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 02</span>
                <span className="text-neutral-500">9 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Aperture & Depth of Field
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Understand why small f-numbers mean large openings, how to achieve creamy bokeh, and how to avoid lens diffraction.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Scale: f/1.4 – f/16</span>
                <span className="text-amber-400">Learn Aperture →</span>
              </div>
            </Link>

            {/* 3. Shutter Speed */}
            <Link
              href="/learn/shutter-speed"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 03</span>
                <span className="text-neutral-500">9 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Shutter Speed & Motion
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Freezing high-speed athletic motion, avoiding handheld camera shake with the reciprocal rule, and capturing silky waterfalls.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Rule: 1 / Focal Length</span>
                <span className="text-amber-400">Learn Shutter →</span>
              </div>
            </Link>

            {/* 4. Exposure Triangle */}
            <Link
              href="/learn/exposure-triangle"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 04</span>
                <span className="text-neutral-500">10 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                The Exposure Triangle
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                The balancing act of photography. Master exposure reciprocity, reading histograms, and dialing in Exposure Compensation.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Equilibrium: Reciprocity</span>
                <span className="text-amber-400">Learn Triangle →</span>
              </div>
            </Link>

            {/* 5. Lighting Fundamentals */}
            <Link
              href="/learn/lighting-fundamentals"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 05</span>
                <span className="text-neutral-500">9 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Lighting Fundamentals
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Hard vs soft light, light direction (front, side, rim, back), and how Golden Hour and Blue Hour sculpt depth.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Quality: Relative Size</span>
                <span className="text-amber-400">Learn Lighting →</span>
              </div>
            </Link>

            {/* 6. Troubleshooting */}
            <Link
              href="/learn/photography-troubleshooting"
              className="group rounded-2xl border border-neutral-800 bg-[#121214] p-6 hover:border-amber-500/40 hover:bg-neutral-900 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">PILLAR 06</span>
                <span className="text-neutral-500">12 min</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                10-Point Troubleshooting
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Direct diagnostic fixes for dark images, camera shake, motion blur, noisy night shots, and unwanted color tints.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Methodology: 6-Part Fix</span>
                <span className="text-amber-400">Diagnose Now →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="border-t border-neutral-800/80 bg-gradient-to-r from-neutral-900 via-[#18181c] to-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100">
            Ready to Take Creative Control of Your Camera?
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto">
            Stop relying on Auto mode. Start with the core exposure principles, test your knowledge with interactive quizzes, and consult the AI Mentor anytime.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
            >
              Start Learning Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              Chat with AI Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
