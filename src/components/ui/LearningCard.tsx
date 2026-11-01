import React from "react";

interface LearningCardProps {
  title: string;
  subtitle: string;
  description: string;
  opticalConcept: string;
  icon: React.ReactNode;
  status: string;
  metrics: Array<{ label: string; value: string }>;
  isComingSoon?: boolean;
}

export function LearningCard({
  title,
  subtitle,
  description,
  opticalConcept,
  icon,
  status,
  metrics,
  isComingSoon = false,
}: LearningCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-7 transition-all duration-200 hover:border-neutral-700 hover:bg-[#1a1a1f] shadow-sm">
      <div>
        {/* Header with icon and status */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            {icon}
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-mono font-medium border ${
              isComingSoon
                ? "bg-neutral-800/80 text-neutral-400 border-neutral-700"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Title and subtitle */}
        <div className="mt-5">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
            {subtitle}
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-100">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            {description}
          </p>
        </div>

        {/* Optical concept explanation */}
        <div className="mt-5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Key Optical Principle:
          </div>
          <p className="mt-1 text-xs text-neutral-300 font-medium">
            {opticalConcept}
          </p>
        </div>
      </div>

      {/* Metrics / Settings Range */}
      <div className="mt-6 border-t border-neutral-800/80 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, i) => (
            <div key={i} className="rounded-lg bg-neutral-900/40 p-2.5 border border-neutral-800/50">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {metric.label}
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-neutral-200">
                {metric.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px]">Module Status:</span>
          <span className="text-neutral-400">
            {isComingSoon ? "Interactive Lesson in Phase 3" : "Foundation Guide Available"}
          </span>
        </div>
      </div>
    </article>
  );
}

