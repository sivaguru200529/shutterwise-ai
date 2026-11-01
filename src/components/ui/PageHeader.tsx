import React from "react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description: string;
  statusNotice?: {
    label: string;
    message: string;
    type?: "info" | "warning" | "neutral";
  };
  children?: React.ReactNode;
}

export function PageHeader({
  badge,
  title,
  description,
  statusNotice,
  children,
}: PageHeaderProps) {
  return (
    <div className="relative border-b border-neutral-800/80 bg-gradient-to-b from-neutral-900/50 to-transparent pb-10 pt-12 sm:pb-14 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {badge && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {badge}
            </div>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
            {description}
          </p>
        </div>

        {statusNotice && (
          <div className="mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-neutral-300">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <span className="font-semibold text-amber-400 font-mono text-xs uppercase tracking-wider block mb-0.5">
                {statusNotice.label}
              </span>
              <p className="text-neutral-300">{statusNotice.message}</p>
            </div>
          </div>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

