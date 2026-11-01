import React from "react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  href?: string;
  isComingSoon?: boolean;
}

export function FeatureCard({
  title,
  description,
  icon,
  badge,
  href,
  isComingSoon = false,
}: FeatureCardProps) {
  const content = (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-6 transition-all duration-200 hover:border-neutral-700 hover:bg-[#1a1a1e] hover:shadow-lg hover:shadow-black/40">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-700/60 bg-neutral-800/80 text-amber-400 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-colors">
            {icon}
          </div>
          {badge && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-medium border ${
                isComingSoon
                  ? "bg-neutral-800/80 text-neutral-400 border-neutral-700"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-100 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-amber-400/90 group-hover:text-amber-300">
        <span>{isComingSoon ? "Planned for future release" : "Explore module"}</span>
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

