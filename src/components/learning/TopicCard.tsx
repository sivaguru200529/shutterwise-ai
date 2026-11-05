"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TopicModule } from "@/types/photography";
import { getCompletedLessonsFromStorage } from "./ProgressIndicator";

interface TopicCardProps {
  module: TopicModule;
  index: number;
}

export function TopicCard({ module, index }: TopicCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const list = getCompletedLessonsFromStorage();
      setIsCompleted(list.includes(module.slug));
    });

    const update = () => {
      const updatedList = getCompletedLessonsFromStorage();
      setIsCompleted(updatedList.includes(module.slug));
    };

    window.addEventListener("shutterwise_progress_updated", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("shutterwise_progress_updated", update);
    };
  }, [module.slug]);

  const renderIcon = (name: string) => {
    switch (name) {
      case "iso":
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        );
      case "aperture":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="m14.31 8 5.74 9.94" />
            <path d="M9.69 8h11.48" />
            <path d="m7.38 12 5.74-9.94" />
            <path d="M9.69 16 3.95 6.06" />
            <path d="M14.31 16H2.83" />
            <path d="m16.62 12-5.74 9.94" />
          </svg>
        );
      case "shutter":
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "triangle":
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 20h20L12 3z" />
          </svg>
        );
      case "light":
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
          </svg>
        );
      case "troubleshooting":
      default:
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.223l2.809-2.809a4.5 4.5 0 00-6.364-6.364l-2.809 2.809m6.364 6.364l-6.364-6.364" />
          </svg>
        );
    }
  };

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#1a1a1f] hover:shadow-xl hover:shadow-black/50">
      <div>
        {/* Top Header with Module number, icon, and badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 group-hover:border-amber-500/60 group-hover:scale-105 transition-all">
              {renderIcon(module.iconName)}
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold text-amber-500 tracking-wider uppercase block">
                Module 0{index + 1}
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                <svg className="h-3.5 w-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {module.estimatedMinutes} min read
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="rounded-full bg-neutral-800/80 px-2.5 py-0.5 text-[10px] font-mono font-medium text-neutral-300 border border-neutral-700">
              {module.difficulty}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Mastered
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-5">
          <h3 className="text-xl font-bold tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
            {module.title}
          </h3>
          <p className="mt-1 text-xs font-mono text-amber-500/90 uppercase tracking-wider">
            {module.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 line-clamp-3">
            {module.description}
          </p>
        </div>

        {/* Key Takeaways Preview */}
        <div className="mt-5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1 font-semibold">
            Core Focus:
          </span>
          <p className="text-xs text-neutral-300 leading-snug line-clamp-2">
            {module.keyPrinciples[0]}
          </p>
        </div>
      </div>

      {/* Action CTA Link */}
      <div className="mt-6 border-t border-neutral-800/80 pt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200">
          Interactive Lesson & Quiz
        </span>
        <Link
          href={`/learn/${module.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-neutral-950 transition-all hover:bg-amber-400 group-hover:shadow-md group-hover:shadow-amber-500/10 active:scale-95"
        >
          <span>Start Lesson</span>
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
