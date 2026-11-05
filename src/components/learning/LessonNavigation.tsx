import Link from "next/link";
import { TopicModule } from "@/types/photography";

interface LessonNavigationProps {
  prevTopic: TopicModule | null;
  nextTopic: TopicModule | null;
}

export function LessonNavigation({ prevTopic, nextTopic }: LessonNavigationProps) {
  return (
    <nav
      className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-neutral-800 pt-8"
      aria-label="Lesson pagination"
    >
      {/* Previous Topic */}
      {prevTopic ? (
        <Link
          href={`/learn/${prevTopic.slug}`}
          className="group flex flex-col rounded-xl border border-neutral-800 bg-[#161619] p-4 text-left transition-all hover:border-neutral-700 hover:bg-[#1a1a1f] sm:max-w-xs flex-1"
        >
          <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-amber-400 transition-colors">
            <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous Lesson
          </span>
          <span className="mt-1 font-semibold text-neutral-200 group-hover:text-white transition-colors text-sm line-clamp-1">
            {prevTopic.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1 sm:max-w-xs" />
      )}

      {/* Back to all modules button */}
      <Link
        href="/learn"
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors text-center"
      >
        <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        All Modules
      </Link>

      {/* Next Topic */}
      {nextTopic ? (
        <Link
          href={`/learn/${nextTopic.slug}`}
          className="group flex flex-col rounded-xl border border-neutral-800 bg-[#161619] p-4 text-right transition-all hover:border-amber-500/40 hover:bg-[#1a1a1f] sm:max-w-xs flex-1"
        >
          <span className="flex items-center justify-end gap-1 text-[11px] font-mono uppercase tracking-wider text-amber-500 transition-colors">
            Next Lesson
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
          <span className="mt-1 font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors text-sm line-clamp-1">
            {nextTopic.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1 sm:max-w-xs" />
      )}
    </nav>
  );
}
