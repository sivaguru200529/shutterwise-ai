import { NextRequest, NextResponse } from "next/server";
import { isGeminiConfigured, sendPhotographyMessage, ChatHistoryItem } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/rate-limiter";
import { ChatRequestBody, ChatResponseBody, ChatErrorResponse } from "@/types/chat";

// Maximum allowable request body size in bytes (10 KB)
const MAX_REQUEST_SIZE_BYTES = 10 * 1024;
// Maximum characters allowed in a user query
const MAX_INPUT_CHARS = 500;
// Maximum past history messages to accept
const MAX_HISTORY_MESSAGES = 6;

export async function POST(req: NextRequest) {
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
    if (!isGeminiConfigured()) {
      const errorPayload: ChatErrorResponse = {
        error:
          "Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your .env.local file.",
        code: "CONFIG_MISSING",
      };
      return NextResponse.json(errorPayload, { status: 503 });
    }

    // 7. Dispatch to Gemini via server-side SDK
    const reply = await sendPhotographyMessage(trimmedMessage, sanitizedHistory);

    const responsePayload: ChatResponseBody = { reply };
    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error: unknown) {
    // Private server-side error logging (no secrets leaked)
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[ShutterWise /api/chat error]:", errorMessage);

    if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
      const errorPayload: ChatErrorResponse = {
        error: "Google Gemini rate limit exceeded. Please wait a moment before trying again.",
        code: "RATE_LIMITED",
      };
      return NextResponse.json(errorPayload, { status: 429 });
    }

    if (
      errorMessage.includes("503") ||
      errorMessage.includes("UNAVAILABLE") ||
      errorMessage.includes("GATEWAY_TIMEOUT")
    ) {
      const errorPayload: ChatErrorResponse = {
        error: "The AI photography mentor is currently unreachable. Please try again shortly.",
        code: "SERVICE_UNAVAILABLE",
      };
      return NextResponse.json(errorPayload, { status: 503 });
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
