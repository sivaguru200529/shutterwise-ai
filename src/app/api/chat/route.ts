import { NextRequest, NextResponse } from "next/server";
import {
  isGroqConfigured,
  sendPhotographyMessage,
  isAbortError,
  isTimeoutError,
  isRateLimitError,
  isAuthError,
  isServiceUnavailableError,
  ChatHistoryItem,
} from "@/lib/groq";
import { checkRateLimit } from "@/lib/rate-limiter";
import { ChatRequestBody, ChatResponseBody, ChatErrorResponse } from "@/types/chat";

// Vercel Serverless Function Configuration
export const runtime = "nodejs";
export const maxDuration = 60; // Max allowed duration on Vercel Hobby plan (seconds)

// Maximum allowable request body size in bytes (10 KB)
const MAX_REQUEST_SIZE_BYTES = 10 * 1024;
// Maximum characters allowed in a user query
const MAX_INPUT_CHARS = 500;
// Maximum past history messages to accept
const MAX_HISTORY_MESSAGES = 6;

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. IP rate limiting (best-effort sliding window)
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.success) {
      const errorPayload: ChatErrorResponse = {
        error: "Rate limit reached. Please wait a moment before sending another message.",
        code: "RATE_LIMITED",
      };
      return NextResponse.json(errorPayload, { status: 429 });
    }

    // 2. Request payload size guard (< 10 KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE_BYTES) {
      const errorPayload: ChatErrorResponse = {
        error: "Request payload too large. Please shorten your message.",
        code: "INVALID_REQUEST",
      };
      return NextResponse.json(errorPayload, { status: 413 });
    }

    // 3. Parse JSON body
    let body: ChatRequestBody;
    try {
      body = await req.json();
    } catch {
      const errorPayload: ChatErrorResponse = {
        error: "Invalid JSON in request body.",
        code: "INVALID_REQUEST",
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    // 4. Validate user message
    if (!body || typeof body.message !== "string") {
      const errorPayload: ChatErrorResponse = {
        error: "Request body must include a valid 'message' string.",
        code: "INVALID_REQUEST",
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    const trimmedMessage = body.message.trim();
    if (trimmedMessage.length === 0) {
      const errorPayload: ChatErrorResponse = {
        error: "Message cannot be empty.",
        code: "INVALID_REQUEST",
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    if (trimmedMessage.length > MAX_INPUT_CHARS) {
      const errorPayload: ChatErrorResponse = {
        error: `Message exceeds the ${MAX_INPUT_CHARS}-character limit (${trimmedMessage.length} characters).`,
        code: "INVALID_REQUEST",
      };
      return NextResponse.json(errorPayload, { status: 400 });
    }

    // 5. Validate and sanitize conversation history
    const sanitizedHistory: ChatHistoryItem[] = [];

    if (Array.isArray(body.history)) {
      // Discard older messages if exceeding window
      const recentHistory = body.history.slice(-MAX_HISTORY_MESSAGES);

      for (const item of recentHistory) {
        if (!item || typeof item !== "object") continue;

        // Disallow system role from client
        if ((item.role as string) === "system") {
          const errorPayload: ChatErrorResponse = {
            error: "Client is not authorized to inject system-role messages.",
            code: "INVALID_REQUEST",
          };
          return NextResponse.json(errorPayload, { status: 400 });
        }

        // Accept only user and assistant
        if (item.role !== "user" && item.role !== "assistant") {
          continue;
        }

        if (typeof item.content === "string" && item.content.trim() !== "") {
          sanitizedHistory.push({
            role: item.role,
            content: item.content.slice(0, MAX_INPUT_CHARS).trim(),
          });
        }
      }
    }

    // 6. Check API configuration
    if (!isGroqConfigured()) {
      const errorPayload: ChatErrorResponse = {
        error:
          "Groq API key is not configured on the server. Please add GROQ_API_KEY to your .env.local file.",
        code: "CONFIG_MISSING",
      };
      return NextResponse.json(errorPayload, { status: 503 });
    }

    // 7. Dispatch to Groq via server-side SDK (with abort signal propagation)
    const reply = await sendPhotographyMessage(
      trimmedMessage,
      sanitizedHistory,
      undefined,
      req.signal
    );

    const durationMs = Date.now() - startTime;
    console.log(`[ShutterWise /api/chat] Success: generated response in ${durationMs}ms`);

    const responsePayload: ChatResponseBody = { reply };
    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error: unknown) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Client cancellation / abort handling: return cleanly without error logging
    if (req.signal.aborted || isAbortError(error)) {
      console.log(`[ShutterWise /api/chat] Client cancelled request after ${durationMs}ms`);
      return new NextResponse(null, { status: 499 });
    }

    // Diagnostic logging: records timing and categorized message (never secrets or full payload)
    console.error(`[ShutterWise /api/chat error] (${durationMs}ms):`, errorMessage);

    if (isTimeoutError(error)) {
      const errorPayload: ChatErrorResponse = {
        error: "The AI photography mentor timed out while generating a response. Please try again.",
        code: "GATEWAY_TIMEOUT",
      };
      return NextResponse.json(errorPayload, { status: 504 });
    }

    if (isRateLimitError(error)) {
      const errorPayload: ChatErrorResponse = {
        error: "Groq rate limit reached. Please wait a moment before trying again.",
        code: "RATE_LIMITED",
      };
      return NextResponse.json(errorPayload, { status: 429 });
    }

    if (isAuthError(error)) {
      const errorPayload: ChatErrorResponse = {
        error: "AI service authentication error. Please check server configuration.",
        code: "SERVER_ERROR",
      };
      return NextResponse.json(errorPayload, { status: 500 });
    }

    if (isServiceUnavailableError(error)) {
      const errorPayload: ChatErrorResponse = {
        error: "The AI photography mentor is currently unreachable. Please try again shortly.",
        code: "SERVICE_UNAVAILABLE",
      };
      return NextResponse.json(errorPayload, { status: 503 });
    }

    if (errorMessage.includes("model_not_found") || errorMessage.includes("does not exist")) {
      const errorPayload: ChatErrorResponse = {
        error: "The configured AI model is unavailable or unrecognized. Please check GROQ_MODEL.",
        code: "SERVER_ERROR",
      };
      return NextResponse.json(errorPayload, { status: 500 });
    }

    if (errorMessage.includes("EMPTY_RESPONSE")) {
      const errorPayload: ChatErrorResponse = {
        error: "The AI mentor returned an empty response. Please try rephrasing your question.",
        code: "SERVER_ERROR",
      };
      return NextResponse.json(errorPayload, { status: 500 });
    }

    const fallbackPayload: ChatErrorResponse = {
      error: "An unexpected error occurred while communicating with the AI mentor.",
      code: "SERVER_ERROR",
    };
    return NextResponse.json(fallbackPayload, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Use POST for chat queries." },
    { status: 405 }
  );
}
