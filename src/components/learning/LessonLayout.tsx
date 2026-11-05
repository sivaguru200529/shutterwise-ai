"use client";

import Link from "next/link";
import { TopicModule } from "@/types/photography";
import { ExampleCard } from "./ExampleCard";
import { KnowledgeCheck } from "./KnowledgeCheck";
import { LessonNavigation } from "./LessonNavigation";
import { LessonCompletionButton } from "./ProgressIndicator";

interface LessonLayoutProps {
  module: TopicModule;
  prevTopic: TopicModule | null;
  nextTopic: TopicModule | null;
}

export function LessonLayout({ module, prevTopic, nextTopic }: LessonLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Breadcrumb & Metadata Header */}
      <section className="border-b border-neutral-800/80 bg-gradient-to-b from-[#18181c] via-[#141416] to-[#121212] py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/learn" className="hover:text-amber-400 transition-colors">
              Learn
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">{module.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {module.difficulty} • {module.estimatedMinutes} min read
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-100 sm:text-4xl lg:text-5xl">
                {module.title}
              </h1>
              <p className="mt-2 text-sm font-mono text-amber-400/90 uppercase tracking-wider">
                {module.subtitle}
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                {module.tagline}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <LessonCompletionButton slug={module.slug} />
              <Link
                href={`/chat?prompt=${encodeURIComponent(`I am studying ${module.title}. Can you explain its core optical principle in simple terms?`)}`}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-neutral-900/80 px-4 py-2.5 text-xs font-semibold text-amber-400 hover:bg-neutral-800 hover:border-amber-500/50 transition-colors"
              >
                <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Ask Mentor About This
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Lesson Body */}
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Core Principles Executive Summary */}
        <div className="rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 shadow-lg">
          <h2 className="text-sm font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
            </svg>
            Key Optical Takeaways
          </h2>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {module.keyPrinciples.map((principle, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-xs leading-relaxed text-neutral-200"
              >
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold border border-amber-500/20">
                  {idx + 1}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {module.contentSections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl border-b border-neutral-800/80 pb-2">
                {sec.title}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-300 whitespace-pre-line">
                {sec.content}
              </p>

              {sec.highlightBox && (
                <div
                  className={`rounded-xl border p-4 text-xs leading-relaxed ${
                    sec.highlightBox.type === "warning"
                      ? "border-amber-500/30 bg-amber-500/5 text-amber-200"
                      : sec.highlightBox.type === "tip"
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200"
                      : "border-sky-500/30 bg-sky-500/5 text-sky-200"
                  }`}
                >
                  <span className="font-mono font-bold uppercase tracking-wider block mb-1">
                    {sec.highlightBox.title}
                  </span>
                  <p className="text-neutral-200 font-medium">{sec.highlightBox.text}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Practical Examples (if present) */}
        {module.practicalExamples && module.practicalExamples.length > 0 && (
          <section className="space-y-5">
            <div className="border-b border-neutral-800/80 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Applied Mechanics
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 mt-0.5">
                Practical Camera Settings in Action
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {module.practicalExamples.map((ex, idx) => (
                <ExampleCard key={idx} example={ex} />
              ))}
            </div>
          </section>
        )}

        {/* Real-World Scenarios Breakdown Table (if present) */}
        {module.scenarios && module.scenarios.length > 0 && (
          <section className="space-y-5">
            <div className="border-b border-neutral-800/80 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Field Presets
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 mt-0.5">
                Real-World Shooting Scenarios
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Note: These values are starting baselines, not rigid formulas. Always calibrate to actual ambient light.
              </p>
            </div>

            <div className="space-y-4">
              {module.scenarios.map((sc, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-800 bg-[#161619] p-5 sm:p-6 transition-all hover:border-neutral-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-800/80 pb-3">
                    <h3 className="text-base font-bold text-neutral-100">{sc.scenario}</h3>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="rounded bg-neutral-800 px-2.5 py-1 text-amber-400 border border-neutral-700">
                        {sc.aperture}
                      </span>
                      <span className="rounded bg-neutral-800 px-2.5 py-1 text-sky-400 border border-neutral-700">
                        {sc.shutterSpeed}
                      </span>
                      <span className="rounded bg-neutral-800 px-2.5 py-1 text-emerald-400 border border-neutral-700">
                        {sc.iso}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                        Why These Settings Work:
                      </span>
                      <p className="text-neutral-300 leading-relaxed">{sc.whyItWorks}</p>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                        Field Adjustments:
                      </span>
                      <p className="text-neutral-300 leading-relaxed">{sc.adjustments}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Troubleshooting Specific Cards (for troubleshooting module) */}
        {module.troubleshootingItems && module.troubleshootingItems.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-neutral-800/80 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Diagnostic Index
              </span>
              <h2 className="text-2xl font-bold text-neutral-100 mt-0.5">
                The 10 Most Common Photographic Errors & Cures
              </h2>
            </div>

            <div className="space-y-5">
              {module.troubleshootingItems.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-800 pb-3">
                    <h3 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
                      {item.title}
                    </h3>
                    <Link
                      href={`/chat?prompt=${encodeURIComponent(item.aiPrompt)}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-mono font-medium text-amber-400 hover:bg-amber-500/20 transition-colors w-fit"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m14.31 8 5.74 9.94" />
                        <path d="M9.69 8h11.48" />
                        <path d="m7.38 12 5.74-9.94" />
                      </svg>
                      Ask AI Mentor
                    </Link>
                  </div>

                  <p className="mt-3 text-xs text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5 font-medium">
                    <span className="font-bold uppercase font-mono mr-1">Symptom:</span>
                    {item.symptom}
                  </p>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px] block mb-1 font-semibold">
                        Possible Physical Causes:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-neutral-300">
                        {item.possibleCauses.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>

                      <div className="mt-3">
                        <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px] block mb-1 font-semibold">
                          How to Identify:
                        </span>
                        <p className="text-neutral-300">{item.howToIdentify}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px] block mb-1 font-semibold">
                        Step-by-Step Resolution:
                      </span>
                      <ul className="space-y-1.5 text-neutral-300">
                        {item.stepByStepSolution.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-2.5 text-[11px] text-neutral-300">
                        <span className="font-bold text-amber-400 block mb-0.5">Real-world Field Example:</span>
                        {item.practicalExample}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Common Mistakes & Corrections */}
        {module.commonMistakes && module.commonMistakes.length > 0 && (
          <section className="rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 shadow-lg">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 block mb-1">
              Avoid Costly Shooting Pitfalls
            </span>
            <h2 className="text-xl font-bold text-neutral-100 sm:text-2xl">
              Common Beginner Mistakes & How to Avoid Them
            </h2>

            <div className="mt-5 space-y-4">
              {module.commonMistakes.map((m, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-800/80 bg-neutral-900/50 p-4 text-xs leading-relaxed">
                  <div className="flex items-start gap-2 text-rose-300 font-medium">
                    <span className="text-rose-400 font-bold">✕ Mistake:</span>
                    <span>{m.mistake}</span>
                  </div>
                  <div className="mt-2 flex items-start gap-2 text-emerald-300 pl-4 border-l border-emerald-500/30">
                    <span className="text-emerald-400 font-bold">✓ Optical Correction:</span>
                    <span className="text-neutral-200">{m.correction}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Knowledge Check Quiz */}
        <KnowledgeCheck
          questions={module.quizQuestions}
          topicTitle={module.title}
        />

        {/* Contextual Ask AI Mentor Section */}
        <section className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#18181c] to-[#141416] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-mono font-bold text-amber-400 border border-amber-500/40">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Live AI Photography Mentor
              </div>
              <h3 className="text-xl font-bold text-neutral-100 mt-2">
                Have specific questions about {module.title}?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                Our AI photography mentor is trained on optical physics, camera manuals, and lighting techniques. Ask anything from specific camera dials to diagnosing your sample shots.
              </p>

              {/* Quick Prompt Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {module.suggestedAiPrompts.map((promptText, i) => (
                  <Link
                    key={i}
                    href={`/chat?prompt=${encodeURIComponent(promptText)}`}
                    className="rounded-lg border border-neutral-700/80 bg-neutral-900/90 px-3 py-1.5 text-[11px] text-neutral-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                  >
                    &ldquo;{promptText}&rdquo;
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                href={`/chat?prompt=${encodeURIComponent(`I have a question about ${module.title}. Explain the key concepts simply.`)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-amber-400 active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Open Chat with Mentor</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Previous / Next Lesson Navigation */}
        <LessonNavigation prevTopic={prevTopic} nextTopic={nextTopic} />
      </div>
    </div>
  );
}
