"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const suggestedQuestions = [
  "What is ISO and when should I increase it?",
  "Explain aperture and how it affects depth of field.",
  "What is shutter speed and how do I prevent motion blur?",
  "Explain the exposure triangle and reciprocity.",
];

export default function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [interactionNotice, setInteractionNotice] = useState<string | null>(null);

  const handleQuestionClick = (question: string) => {
    setInputText(question);
    setInteractionNotice(
      "Sample prompt selected. The AI Photography Mentor will be connected to Gemini in Phase 2. API calls are strictly disabled during this Phase 1 frontend preview."
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setInteractionNotice(
      "AI Tutor Engine is currently offline. As per Phase 1 architectural boundaries, Gemini API integration occurs in Phase 2. No AI requests were transmitted."
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <PageHeader
        badge="Phase 1 Interface Preview"
        title="AI Photography Tutor"
        description="Your interactive mentor for demystifying camera settings, diagnosing shooting errors, and understanding light."
        statusNotice={{
          label: "Development Notice — Phase 2 In Progress",
          message:
            "This is a frontend preview of the conversational photography assistant. Gemini API integration, prompt routing, and conversational memory are scheduled for Phase 2. No live AI requests or simulated fake responses are active.",
          type: "info",
        }}
      />

      {/* Chat Workspace */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col h-[650px] rounded-2xl border border-neutral-800 bg-[#161619] shadow-xl overflow-hidden">
          {/* Chat Window Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-[#121214] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/30 bg-neutral-900">
                <svg
                  className="h-5 w-5 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m14.31 8 5.74 9.94" />
                  <path d="M9.69 8h11.48" />
                  <path d="m7.38 12 5.74-9.94" />
                  <path d="M9.69 16 3.95 6.06" />
                  <path d="M14.31 16H2.83" />
                  <path d="m16.62 12-5.74 9.94" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-500" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  ShutterWise Mentor
                  <span className="rounded bg-neutral-800 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-neutral-700">
                    v0.1.0 Preview
                  </span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Status: <span className="text-amber-400">Offline (Phase 1 Frontend Foundation)</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-neutral-600" />
              No External API Loaded
            </div>
          </div>

          {/* Conversation Area (Welcome & Explanation State) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Welcome Banner Card */}
            <div className="rounded-xl border border-neutral-800/90 bg-[#121215] p-6 max-w-2xl mx-auto text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-100">
                    Welcome to the ShutterWise Photography Mentor
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    This assistant is being developed to answer camera settings questions and guide beginners through troubleshooting blurry, noisy, or incorrectly exposed images.
                  </p>
                  <div className="mt-4 rounded-lg bg-neutral-900 p-3 text-xs text-neutral-400 border border-neutral-800 font-mono">
                    <span className="text-amber-400 font-semibold">Core Principle:</span> Explain the *Why*, not just the *What*.
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Notice when user types or clicks */}
            {interactionNotice && (
              <div className="max-w-2xl mx-auto rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-neutral-300 flex items-start gap-3">
                <svg className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <span className="font-semibold text-amber-400 uppercase font-mono tracking-wider block">
                    Phase 1 Boundary Active
                  </span>
                  <p className="mt-0.5">{interactionNotice}</p>
                </div>
                <button
                  onClick={() => setInteractionNotice(null)}
                  className="text-neutral-400 hover:text-neutral-200"
                  aria-label="Dismiss notice"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Suggested Prompts Section */}
            <div className="max-w-2xl mx-auto">
              <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Suggested Questions (Preview Examples):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuestionClick(q)}
                    className="flex items-center justify-between text-left rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs text-neutral-300 hover:border-amber-500/40 hover:bg-neutral-800 hover:text-amber-300 transition-colors"
                  >
                    <span>{q}</span>
                    <span className="text-amber-500/60 text-sm ml-2">↳</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Input Area */}
          <div className="border-t border-neutral-800 bg-[#121214] p-4">
            <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                  placeholder="Ask a photography question (e.g. Why is my photo blurry?)..."
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  aria-label="Photography query input"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Send</span>
                  <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Phase 1 Frontend Sandbox • Zero API Calls</span>
                <span>{inputText.length} / 500 chars</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

