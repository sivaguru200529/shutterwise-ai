"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types/photography";

interface KnowledgeCheckProps {
  questions: QuizQuestion[];
  topicTitle: string;
}

export function KnowledgeCheck({ questions, topicTitle }: KnowledgeCheckProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    // If already submitted this question, don't allow changing
    if (submittedQuestions[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (questionId: string) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(submittedQuestions).length;
  const correctCount = questions.filter(
    (q) => submittedQuestions[q.id] && selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section className="rounded-2xl border border-neutral-800 bg-[#161619] p-6 sm:p-8 shadow-xl mt-12">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-100">
              Knowledge Check: {topicTitle}
            </h3>
            <p className="text-xs text-neutral-400">
              Verify your comprehension of the core optical mechanics and settings trade-offs.
            </p>
          </div>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-mono text-neutral-400">Score</span>
              <div className="text-base font-bold font-mono text-amber-400">
                {correctCount} / {totalQuestions}
              </div>
            </div>
            {answeredCount === totalQuestions && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                Reset Quiz
              </button>
            )}
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="mt-6 space-y-8">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isSubmitted = Boolean(submittedQuestions[q.id]);
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-5 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-neutral-800 text-xs font-mono font-bold text-amber-400 border border-neutral-700">
                  {qIndex + 1}
                </span>
                <p className="text-sm font-semibold text-neutral-100 leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* Options */}
              <div className="mt-4 space-y-2.5 pl-9">
                {q.options.map((option, optIndex) => {
                  const isOptionSelected = selected === optIndex;
                  let optionStyles =
                    "border-neutral-800 bg-[#121214] text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/60";

                  if (isSubmitted) {
                    if (optIndex === q.correctIndex) {
                      optionStyles = "border-emerald-500/50 bg-emerald-500/10 text-emerald-200 font-medium";
                    } else if (isOptionSelected && !isCorrect) {
                      optionStyles = "border-rose-500/50 bg-rose-500/10 text-rose-200";
                    } else {
                      optionStyles = "border-neutral-800/60 bg-neutral-900/30 text-neutral-500 opacity-60";
                    }
                  } else if (isOptionSelected) {
                    optionStyles = "border-amber-500/60 bg-amber-500/10 text-amber-200 font-medium shadow-sm";
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full text-left rounded-xl border p-3 text-xs leading-relaxed transition-all flex items-center justify-between ${optionStyles}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] font-mono ${
                            isOptionSelected
                              ? "border-amber-400 bg-amber-400 text-neutral-950 font-bold"
                              : "border-neutral-600"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{option}</span>
                      </span>

                      {isSubmitted && optIndex === q.correctIndex && (
                        <svg className="h-4 w-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {isSubmitted && isOptionSelected && !isCorrect && (
                        <svg className="h-4 w-4 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Button & Explanatory Feedback */}
              <div className="mt-4 pl-9">
                {!isSubmitted ? (
                  <button
                    type="button"
                    disabled={selected === undefined}
                    onClick={() => handleCheckAnswer(q.id)}
                    className="rounded-lg bg-neutral-800 px-4 py-1.5 text-xs font-semibold text-neutral-200 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div
                    className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                      isCorrect
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-200"
                        : "border-rose-500/30 bg-rose-500/5 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono font-semibold uppercase text-[11px] mb-1">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          ✓ Correct Analysis
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          ✕ Incorrect — Optical Explanation Below
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-300">{q.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
