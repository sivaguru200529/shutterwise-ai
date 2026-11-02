import { GoogleGenAI } from "@google/genai";
import { PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION } from "./system-prompt";

// Centralized timeout constant in milliseconds (55 seconds gives a 5s margin before Vercel's 60s hard limit)
export const GEMINI_REQUEST_TIMEOUT_MS = 55000;

// Maximum output tokens: keeps responses focused, concise, and avoids free-tier token latency
export const GEMINI_MAX_OUTPUT_TOKENS = 800;

// Default model supporting the Gemini Developer API free tier.
// Note: Google deprecated gemini-2.5-flash for new users and recommends gemini-3.5-flash-lite.
// gemini-3.5-flash-lite provides fast responses (~2-4s) within free-tier quotas.
export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

/**
 * Validates whether the Gemini API key is configured on the server.
 */
export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "");
}

/**
 * Returns an initialized GoogleGenAI instance or throws a descriptive error if unconfigured.
 */
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("CONFIG_MISSING: GEMINI_API_KEY is not configured on the server.");
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      timeout: GEMINI_REQUEST_TIMEOUT_MS,
    },
  });
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/**
 * Checks whether an error represents an upstream timeout condition.
 */
export function isTimeoutError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("GATEWAY_TIMEOUT") ||
    msg.includes("RequestTimeoutError") ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("timeout") ||
    msg.includes("timed out") ||
    msg.includes("DEADLINE_EXCEEDED")
  );
}

/**
 * Checks whether an error represents a temporary/transient failure eligible for retry.
 */
function isTransientError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("503") ||
    msg.includes("UNAVAILABLE") ||
    msg.includes("429") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("fetch failed")
  );
}

/**
 * Helper to execute a single generation attempt with timeout protection.
 */
async function executeGenerationAttempt(
  ai: GoogleGenAI,
  modelName: string,
  contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>,
  timeoutMs: number
): Promise<string> {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error("GATEWAY_TIMEOUT: Gemini API request timed out."));
    }, timeoutMs);
  });

  try {
    const apiCallPromise = ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS,
        httpOptions: {
          timeout: timeoutMs,
        },
      },
    });

    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    const replyText = response.text;

    if (!replyText || replyText.trim() === "") {
      throw new Error("EMPTY_RESPONSE: Model returned an empty response.");
    }

    return replyText.trim();
  } finally {
    if (timerId) {
      clearTimeout(timerId);
    }
  }
}

/**
 * Dispatches a photography conversation prompt to the Gemini API using @google/genai.
 * Features centralized timeout control and conservative retry with exponential backoff & jitter.
 *
 * @param message The user's current message (validated to <= 500 characters).
 * @param history Recent conversation history (capped to maximum 6 prior turns).
 * @param timeoutMs Request timeout in milliseconds (default 55,000ms).
 */
export async function sendPhotographyMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  timeoutMs = GEMINI_REQUEST_TIMEOUT_MS
): Promise<string> {
  const startTime = Date.now();
  const ai = getGeminiClient();
  const modelName = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  // Build the contents array for multi-turn conversational context
  // Gemini expects roles: 'user' and 'model'
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  // Append validated recent history turns
  for (const item of history) {
    if (item.content && item.content.trim() !== "") {
      contents.push({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content.trim() }],
      });
    }
  }

  // Append current user message
  contents.push({
    role: "user",
    parts: [{ text: message.trim() }],
  });

  try {
    return await executeGenerationAttempt(ai, modelName, contents, timeoutMs);
  } catch (firstError) {
    const elapsedMs = Date.now() - startTime;
    const remainingMs = timeoutMs - elapsedMs;

    // Only retry if it is a transient error (503/429), not a timeout, and we have ample time remaining (> 10s)
    if (isTransientError(firstError) && !isTimeoutError(firstError) && remainingMs > 10000) {
      // Conservative backoff with jitter (~1.0s to 1.5s)
      const backoffDelay = 1000 + Math.floor(Math.random() * 500);
      await new Promise((resolve) => setTimeout(resolve, backoffDelay));

      const adjustedTimeout = remainingMs - backoffDelay;
      if (adjustedTimeout > 5000) {
        return await executeGenerationAttempt(ai, modelName, contents, adjustedTimeout);
      }
    }

    // If it is a timeout error, rethrow as clean GATEWAY_TIMEOUT
    if (isTimeoutError(firstError)) {
      throw new Error("GATEWAY_TIMEOUT: Gemini API request timed out.");
    }

    throw firstError;
  }
}
