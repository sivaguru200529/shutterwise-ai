"use client";

import { useState, useEffect } from "react";
import { TopicSlug } from "@/types/photography";

const STORAGE_KEY = "shutterwise_completed_lessons_v1";

export function getCompletedLessonsFromStorage(): TopicSlug[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCompletedLessonsToStorage(completed: TopicSlug[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  } catch {
    // ignore
  }
}

export function LessonCompletionButton({ slug }: { slug: TopicSlug }) {
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const list = getCompletedLessonsFromStorage();
      setCompleted(list.includes(slug));
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [slug]);

  const toggle = () => {
    const list = getCompletedLessonsFromStorage();
    let updated: TopicSlug[];
    if (list.includes(slug)) {
      updated = list.filter((s) => s !== slug);
      setCompleted(false);
    } else {
      updated = [...list, slug];
      setCompleted(true);
    }
    saveCompletedLessonsToStorage(updated);
    // Dispatch a custom event so other components on page react
    window.dispatchEvent(new Event("shutterwise_progress_updated"));
  };

  if (!mounted) {
    return (
      <div className="h-10 w-48 rounded-xl bg-neutral-800/50 animate-pulse border border-neutral-700/40" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-sm ${
        completed
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
          : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 hover:border-neutral-600"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
          completed
            ? "border-emerald-400 bg-emerald-500 text-neutral-950 font-bold"
            : "border-neutral-500 bg-transparent"
        }`}
      >
        {completed && (
          <svg className="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </span>
      <span>{completed ? "Lesson Mastered" : "Mark as Mastered"}</span>
    </button>
  );
}

export function LearningDashboardProgress({ totalLessons = 6 }: { totalLessons?: number }) {
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const update = () => {
      const list = getCompletedLessonsFromStorage();
      setCompletedCount(list.length);
    };
    const frame = requestAnimationFrame(() => {
      update();
      setMounted(true);
    });
    window.addEventListener("shutterwise_progress_updated", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("shutterwise_progress_updated", update);
    };
  }, []);

  if (!mounted) {
    return <div className="h-16 w-full rounded-2xl bg-neutral-800/30 animate-pulse border border-neutral-800" />;
  }

  const percentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#161619] p-5 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            Your Learning Journey
          </span>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2 mt-0.5">
            Curriculum Progress
            <span className="text-xs font-mono font-medium rounded-full bg-neutral-800 px-2 py-0.5 text-neutral-300 border border-neutral-700">
              {completedCount} of {totalLessons} Modules
            </span>
          </h2>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black font-mono text-amber-400">{percentage}%</span>
          <span className="text-xs text-neutral-400 block -mt-1">Completed</span>
        </div>
      </div>

      <div className="mt-4 h-2.5 w-full rounded-full bg-neutral-800/80 overflow-hidden border border-neutral-700/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
