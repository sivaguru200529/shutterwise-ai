"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChatMessage, ChatRequestBody, ChatResponseBody, ChatErrorResponse } from "@/types/chat";
import { loadStoredChatHistory, saveChatHistory, clearStoredChatHistory } from "@/lib/storage";

const suggestedQuestions = [
  "What is ISO and when should I increase it?",
  "Explain aperture and how it affects depth of field.",
  "What is shutter speed and how do I prevent motion blur?",
  "Explain the exposure triangle and reciprocity.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll helper
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    }
  }, []);

  // Hydrate chat history from localStorage on initial client mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stored = loadStoredChatHistory();
      if (stored.length > 0) {
        setMessages(stored);
      }
      setIsClientLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Save chat history to localStorage whenever messages change (only after client load)
  useEffect(() => {
    if (isClientLoaded) {
      saveChatHistory(messages);
      scrollToBottom();
    }
  }, [messages, isClientLoaded, scrollToBottom]);

  // Send message implementation
  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorNotice(null);
    setLastFailedMessage(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    };

    // Optimistically update conversation
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText("");
    setIsLoading(true);

    try {
      // Build history payload: last 6 messages excluding current
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const requestBody: ChatRequestBody = {
        message: trimmed,
        history: historyPayload,
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: ChatResponseBody | ChatErrorResponse = await res.json();

      if (!res.ok) {
        const errorMsg =
          "error" in data ? data.error : "Failed to receive a response from the AI mentor.";
        setErrorNotice(errorMsg);
        setLastFailedMessage(trimmed);
        return;
      }

      if ("reply" in data && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role: "assistant",
          content: data.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error("Empty response received from the server.");
      }
    } catch (err) {
      const displayErr =
        err instanceof Error ? err.message : "Network error. Unable to reach the server.";
      setErrorNotice(displayErr);
      setLastFailedMessage(trimmed);
    } finally {
      setIsLoading(false);
      // Refocus input
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;
    const confirmClear = window.confirm("Are you sure you want to clear your conversation history?");
    if (confirmClear) {
      clearStoredChatHistory();
      setMessages([]);
      setErrorNotice(null);
      setLastFailedMessage(null);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <PageHeader
        badge="Phase 2 • Gemini AI Integration"
        title="AI Photography Tutor"
        description="Your interactive mentor for demystifying camera settings, diagnosing shooting errors, and understanding light."
      />

      {/* Chat Workspace */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col h-[700px] rounded-2xl border border-neutral-800 bg-[#161619] shadow-xl overflow-hidden">
          {/* Chat Window Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-[#121214] px-4 py-3 sm:px-6 sm:py-4">
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
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  ShutterWise Mentor
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                    Gemini Connected
                  </span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Status: <span className="text-emerald-400">Ready</span> • Explain the *Why*, not just *What*
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 px-2.5 py-1 text-xs text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors"
                  title="Clear conversation history from browser storage"
                  aria-label="Clear chat history"
                >
                  <svg className="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Clear Chat</span>
                </button>
              )}
            </div>
          </div>

          {/* Conversation Area */}
          <div
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Conversation with ShutterWise Mentor"
          >
            {/* Initial Welcome Banner if no conversation history */}
            {messages.length === 0 && (
              <div className="rounded-xl border border-neutral-800/90 bg-[#121215] p-6 max-w-2xl mx-auto text-center sm:text-left mt-2">
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
                      Ask me about camera dials, exposure dilemmas, lighting qualities, or why your photos look blurry, noisy, or dark. I explain the optical principles and physical trade-offs behind every setting.
                    </p>
                    <div className="mt-4 rounded-lg bg-neutral-900 p-3 text-xs text-neutral-400 border border-neutral-800 font-mono">
                      <span className="text-amber-400 font-semibold">Core Principle:</span> Explain the *Why*, not just the *What*.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rendered Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${
                  msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-neutral-900 text-amber-500 mt-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m14.31 8 5.74 9.94" />
                      <path d="M9.69 8h11.48" />
                      <path d="m7.38 12 5.74-9.94" />
                      <path d="M9.69 16 3.95 6.06" />
                      <path d="M14.31 16H2.83" />
                      <path d="m16.62 12-5.74 9.94" />
                    </svg>
                  </div>
                )}

                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-neutral-800 border border-amber-500/30 text-neutral-100 rounded-br-sm"
                      : "bg-[#121215] border border-neutral-800 text-neutral-200 rounded-bl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div
                    className={`mt-1.5 text-[10px] font-mono text-neutral-500 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-3xl mr-auto justify-start">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-neutral-900 text-amber-500 mt-1">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-[#121215] border border-neutral-800 px-4 py-3 text-sm text-neutral-400 flex items-center gap-2">
                  <span>Analyzing camera optics and exposure...</span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}

            {/* Error Message & Retry Banner */}
            {errorNotice && (
              <div className="max-w-2xl mx-auto rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-200 flex items-start gap-3">
                <svg className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <span className="font-semibold text-rose-300 uppercase font-mono tracking-wider block">
                    Assistance Error
                  </span>
                  <p className="mt-0.5">{errorNotice}</p>
                  {lastFailedMessage && (
                    <div className="mt-2.5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-rose-200 hover:bg-rose-500/30 transition-colors border border-rose-500/30"
                      >
                        ↻ Retry Message
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setErrorNotice(null)}
                  className="text-rose-400 hover:text-rose-200"
                  aria-label="Dismiss error notice"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Suggested Prompts Section */}
            {messages.length === 0 && (
              <div className="max-w-2xl mx-auto pt-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                  Suggested Questions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="flex items-center justify-between text-left rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-xs text-neutral-300 hover:border-amber-500/40 hover:bg-neutral-800 hover:text-amber-300 transition-colors disabled:opacity-50"
                    >
                      <span>{q}</span>
                      <span className="text-amber-500/60 text-sm ml-2">↳</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Area */}
          <div className="border-t border-neutral-800 bg-[#121214] p-3 sm:p-4">
            <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Ask a photography question (e.g. Why is my photo blurry?)..."
                  className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                  aria-label="Photography query input"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-amber-500 px-5 text-sm font-semibold text-neutral-950 transition-all hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Send query"
                >
                  <span>Send</span>
                  <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Enter to send • Shift+Enter for newline</span>
                <span className={inputText.length >= 480 ? "text-amber-400 font-semibold" : ""}>
                  {inputText.length} / 500 chars
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
