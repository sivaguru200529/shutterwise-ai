"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { MarkdownContent } from "@/components/chat/MarkdownContent";
import { ChatMessage, ChatRequestBody, ChatResponseBody, ChatErrorResponse } from "@/types/chat";
import { loadStoredChatHistory, saveChatHistory, clearStoredChatHistory } from "@/lib/storage";

const suggestedQuestions = [
  "What is ISO and when should I increase it?",
  "Explain aperture and how it affects depth of field.",
  "What is shutter speed and how do I prevent motion blur?",
  "Explain the exposure triangle and reciprocity.",
  "Why are my indoor photos coming out blurry or yellow?",
  "What are good starting settings for a sunset portrait?",
];

function generateMessageId(prefix: "user" | "assistant"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getCurrentTimestamp(): number {
  return Date.now();
}

function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const searchParams = useSearchParams();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isNearBottomRef = useRef(true);
  const isInitialMountRef = useRef(true);
  const previousMessagesCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef<number>(0);

  // Dedicated container scroll-to-bottom helper (never scrolls the browser window)
  const scrollToBottom = useCallback((smooth = true) => {
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
      isNearBottomRef.current = true;
      setShowScrollToBottom(false);
    });
  }, []);

  // Dedicated container scroll-to-message-top helper (never scrolls the browser window)
  const scrollToMessageTop = useCallback((messageId: string, smooth = true) => {
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
      const element = document.getElementById(`message-${messageId}`);
      if (!element) return;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const targetScrollTop = container.scrollTop + (elementRect.top - containerRect.top) - 12;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: smooth ? "smooth" : "auto",
      });

      const { scrollHeight, clientHeight } = container;
      isNearBottomRef.current = scrollHeight - (targetScrollTop + clientHeight) < 80;
    });
  }, []);

  // Monitor scroll position in the conversation container
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // User is considered at the bottom if within 80px threshold
    const isAtBottom = distanceFromBottom < 80;
    isNearBottomRef.current = isAtBottom;

    // Show floating button only if user scrolled up and container has scrollable content
    const hasScrollableContent = scrollHeight > clientHeight + 40;
    const shouldShow = !isAtBottom && hasScrollableContent;
    setShowScrollToBottom((prev) => (prev !== shouldShow ? shouldShow : prev));
  }, []);

  // Reset window scroll to top on initial page mount (e.g. when navigating from other long pages)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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

  // Cleanup active AbortController on component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Handle URL query parameters for contextual questions (e.g. /chat?prompt=...)
  useEffect(() => {
    const promptParam = searchParams.get("prompt");
    if (promptParam && promptParam.trim()) {
      const frame = requestAnimationFrame(() => {
        setInputText(promptParam.trim());
        setTimeout(() => {
          textareaRef.current?.focus({ preventScroll: true });
        }, 50);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [searchParams]);

  // Save chat history to localStorage whenever messages change (only after client load)
  useEffect(() => {
    if (isClientLoaded) {
      saveChatHistory(messages);
    }
  }, [messages, isClientLoaded]);

  // Intelligent conversation scrolling: follows new messages without disturbing user reading position
  useEffect(() => {
    // Avoid any auto-scrolling on initial page load / mount
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      previousMessagesCountRef.current = messages.length;
      return;
    }

    if (messages.length > previousMessagesCountRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === "user") {
        // User sent a message: always scroll down to see the sent bubble
        scrollToBottom(true);
      } else if (lastMessage?.role === "assistant") {
        // Assistant replied: scroll to top of new response only if user was already following at the bottom
        if (isNearBottomRef.current) {
          scrollToMessageTop(lastMessage.id, true);
        }
      }
    }

    previousMessagesCountRef.current = messages.length;
  }, [messages, scrollToBottom, scrollToMessageTop]);

  // Scroll to reveal assistant loading indicator only if user was near bottom
  useEffect(() => {
    if (isLoading && isNearBottomRef.current) {
      scrollToBottom(true);
    }
  }, [isLoading, scrollToBottom]);

  // Stop generating callback to abort in-flight requests immediately
  const handleStopGenerating = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  // Send message implementation with retry deduplication and cancellation support
  const handleSendMessage = async (textToSend: string, isRetry = false) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setErrorNotice(null);
    setLastFailedMessage(null);

    // Abort any existing in-flight controller before starting a new request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    const requestId = ++activeRequestIdRef.current;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Prevent duplicate user message bubble if retrying the same message
    const baseMessages =
      isRetry &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      messages[messages.length - 1].content === trimmed
        ? messages.slice(0, -1)
        : messages;

    const userMsg: ChatMessage = {
      id: generateMessageId("user"),
      role: "user",
      content: trimmed,
      timestamp: getCurrentTimestamp(),
    };

    // Optimistically update conversation
    const updatedMessages = [...baseMessages, userMsg];
    setMessages(updatedMessages);
    setInputText("");
    setIsLoading(true);

    try {
      // Build history payload: last 6 messages prior to current query
      const historyPayload = baseMessages.slice(-6).map((m) => ({
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
        signal: controller.signal,
      });

      // Discard stale responses if a newer request was dispatched
      if (requestId !== activeRequestIdRef.current) {
        return;
      }

      const data: ChatResponseBody | ChatErrorResponse = await res.json();

      if (requestId !== activeRequestIdRef.current) {
        return;
      }

      if (!res.ok) {
        const errorMsg =
          "error" in data ? data.error : "Failed to receive a response from the AI mentor.";
        setErrorNotice(errorMsg);
        setLastFailedMessage(trimmed);
        return;
      }

      if ("reply" in data && data.reply) {
        const assistantMsg: ChatMessage = {
          id: generateMessageId("assistant"),
          role: "assistant",
          content: data.reply,
          timestamp: getCurrentTimestamp(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error("Empty response received from the server.");
      }
    } catch (err: unknown) {
      // Discard errors from stale requests
      if (requestId !== activeRequestIdRef.current) {
        return;
      }

      // If cancelled by the user clicking Stop, do not display an error banner
      if (
        controller.signal.aborted ||
        (err instanceof Error && err.name === "AbortError")
      ) {
        return;
      }

      const displayErr =
        err instanceof Error ? err.message : "Network error. Unable to reach the server.";
      setErrorNotice(displayErr);
      setLastFailedMessage(trimmed);
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setIsLoading(false);
        abortControllerRef.current = null;
        setTimeout(() => {
          textareaRef.current?.focus({ preventScroll: true });
        }, 50);
      }
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
      handleSendMessage(lastFailedMessage, true);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <PageHeader
        compact={true}
        badge="Phase 3 • Groq AI Integration"
        title="AI Photography Mentor"
        description="Your interactive tutor for camera settings, diagnosing shooting errors, and understanding optical physics in plain English."
      />

      {/* Chat Workspace */}
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col h-[calc(100dvh-13.5rem)] min-h-[500px] max-h-[720px] rounded-2xl border border-neutral-800 bg-[#161619] shadow-2xl overflow-hidden">
          {/* Chat Window Header */}
          <div className="flex-shrink-0 flex items-center justify-between border-b border-neutral-800 bg-[#121214] px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-neutral-900 shadow-sm">
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
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#121214]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  ShutterWise Mentor
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-400 border border-amber-500/30">
                    Groq GPT-OSS 20B
                  </span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Status: <span className="text-emerald-400 font-medium">Ready</span> • Explain the <em className="text-amber-400 not-italic font-semibold">Why</em>, not just the What
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/learn"
                className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                Curriculum
              </Link>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 px-2.5 py-1.5 text-xs text-neutral-300 hover:border-rose-500/50 hover:text-rose-300 transition-colors"
                  title="Clear conversation history from browser storage"
                  aria-label="Clear chat history"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Conversation Workspace Container */}
          <div className="relative flex-1 min-h-0 flex flex-col">
            {/* Scrollable Conversation Area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
              role="log"
              aria-live="polite"
              aria-label="Conversation with ShutterWise Mentor"
            >
            {/* Initial Welcome Banner if no conversation history */}
            {messages.length === 0 && (
              <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 max-w-2xl mx-auto text-center sm:text-left mt-2">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-100">
                      Welcome to ShutterWise Photography Mentor
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                      Ask me about camera dials, exposure dilemmas, lighting qualities, or why your photos look blurry, noisy, or dark. I explain the optical principles and physical trade-offs behind every setting.
                    </p>
                    <div className="mt-3.5 rounded-lg bg-neutral-900 p-2.5 text-[11px] text-neutral-400 border border-neutral-800 font-mono">
                      <span className="text-amber-400 font-semibold">Core Principle:</span> Explain the *Why*, not just the *What*.
                    </div>
                  </div>
                </div>

                {/* Suggested Questions Grid */}
                <div className="mt-6 border-t border-neutral-800 pt-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5 font-semibold">
                    Popular Starter Questions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-2.5 text-left text-xs text-neutral-300 hover:border-amber-500/40 hover:text-amber-300 hover:bg-neutral-800/60 transition-all flex items-center justify-between group"
                      >
                        <span className="line-clamp-1">{q}</span>
                        <svg className="h-3.5 w-3.5 text-neutral-500 group-hover:text-amber-400 flex-shrink-0 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rendered Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                id={`message-${msg.id}`}
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
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed min-w-0 max-w-full ${
                    msg.role === "user"
                      ? "bg-neutral-800 border border-amber-500/30 text-neutral-100 rounded-br-sm"
                      : "bg-[#121215] border border-neutral-800 text-neutral-200 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownContent content={msg.content} />
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
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

            <div ref={messagesEndRef} />
          </div>

          {/* Floating Scroll-to-Bottom Button */}
          {showScrollToBottom && (
            <button
              type="button"
              onClick={() => scrollToBottom(true)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 rounded-full border border-neutral-700/80 bg-neutral-900/95 px-3.5 py-1.5 text-xs font-medium text-neutral-200 shadow-xl backdrop-blur hover:border-amber-500/50 hover:text-amber-300 hover:bg-neutral-800 transition-all duration-200 active:scale-95"
              aria-label="Scroll to latest messages"
            >
              <svg
                className="h-3.5 w-3.5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              <span>Scroll to bottom</span>
            </button>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="flex-shrink-0 border-t border-neutral-800 bg-[#121214] p-3 sm:p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative flex items-center">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a photography question (e.g. 'Why is my photo blurry at 1/30s?')..."
                rows={2}
                maxLength={500}
                className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 pr-14 text-sm text-neutral-100 placeholder-neutral-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
              />
              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStopGenerating}
                  className="absolute right-2.5 bottom-3.5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 px-3 text-neutral-950 font-medium text-xs transition-all active:scale-95 shadow-sm shadow-rose-500/20"
                  aria-label="Stop generating response"
                  title="Stop generating"
                >
                  <span className="h-2.5 w-2.5 rounded-xs bg-neutral-950 flex-shrink-0" />
                  <span className="font-semibold text-[11px] tracking-wide">Stop</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2.5 bottom-3.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-neutral-950 transition-all hover:bg-amber-400 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm shadow-amber-500/20"
                  aria-label="Send message"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
              <span className="hidden sm:inline">
                Press <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1 py-0.5 text-neutral-400">Enter</kbd> to send, <kbd className="rounded border border-neutral-700 bg-neutral-800 px-1 py-0.5 text-neutral-400">Shift+Enter</kbd> for new line
              </span>
              <span className="sm:hidden">Tap send icon</span>
              <span className={inputText.length > 450 ? "text-amber-400 font-bold" : ""}>
                {inputText.length} / 500
              </span>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh] text-neutral-400 text-sm font-mono">
          Loading AI Mentor...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
