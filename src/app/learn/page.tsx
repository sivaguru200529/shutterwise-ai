import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAllTopics } from "@/data/photography";
import { TopicCard } from "@/components/learning/TopicCard";
import { LearningDashboardProgress } from "@/components/learning/ProgressIndicator";

export const metadata = {
  title: "Photography Knowledge Hub — Master Core Optics & Settings | ShutterWise AI",
  description:
    "Explore our six comprehensive photography learning modules covering ISO, Aperture, Shutter Speed, the Exposure Triangle, Lighting Fundamentals, and Diagnostic Troubleshooting.",
};

export default function LearnPage() {
  const topics = getAllTopics();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Phase 3 • Knowledge Engine"
        title="Photography Knowledge Hub"
        description="Master the optical mechanics of exposure, sensor sensitivity, shutter duration, and the physical qualities of natural light through structured, interactive lessons."
      />

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        {/* Progress Tracker Widget */}
        <LearningDashboardProgress totalLessons={topics.length} />

        {/* Learning Modules Grid */}
        <section aria-labelledby="modules-heading">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-800 pb-4 mb-8">
            <div>
              <h2 id="modules-heading" className="text-2xl font-bold tracking-tight text-neutral-100">
                Core Curriculum Modules
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Select a topic below to begin an interactive lesson, explore practical camera settings, and test your knowledge.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Curriculum:</span>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-mono font-medium text-amber-400 border border-amber-500/20">
                6 In-Depth Modules
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <TopicCard key={topic.slug} module={topic} index={index} />
            ))}
          </div>
        </section>

        {/* Need Help / Ask AI Mentor Callout */}
        <section className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-[#18181c] to-neutral-900 p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-400 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Contextual AI Guidance
              </div>
              <h3 className="text-2xl font-bold text-neutral-100">
                Stuck on a tricky optical concept?
              </h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                Our Groq-powered AI Mentor is always online. Ask about reciprocal focal length math, how your specific camera brand names its autofocus modes, or upload your exposure dilemmas for personalized step-by-step guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-amber-400 active:scale-95 shadow-md shadow-amber-500/10"
              >
                <span>Ask AI Mentor</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
              >
                Exposure Calculator
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
