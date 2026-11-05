import React from "react";
import { PracticalExample } from "@/types/photography";

interface ExampleCardProps {
  example: PracticalExample;
}

export function ExampleCard({ example }: ExampleCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161619] p-5 sm:p-6 transition-all hover:border-neutral-700 hover:bg-[#19191d]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-amber-400 rounded-md bg-amber-500/10 px-2.5 py-1 border border-amber-500/20">
            {example.setting}
          </span>
          {example.badge && (
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full border border-neutral-700/60">
              {example.badge}
            </span>
          )}
        </div>

        <h4 className="mt-3.5 text-base font-bold text-neutral-100">
          {example.title}
        </h4>
        <div className="mt-1 text-xs text-neutral-400 font-mono">
          Context: {example.scenario}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-neutral-300">
          {example.explanation}
        </p>
      </div>
    </div>
  );
}
