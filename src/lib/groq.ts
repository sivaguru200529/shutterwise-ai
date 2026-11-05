import Groq from "groq-sdk";
import { PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION } from "./system-prompt";

// Centralized timeout constant in milliseconds (25 seconds)
export const GROQ_REQUEST_TIMEOUT_MS = 25000;

// Maximum output tokens: accommodates reasoning tokens and formatted 6-part framework
export const GROQ_MAX_OUTPUT_TOKENS = 1500;

// Default open-source model running on Groq LPU inference
export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-20b";

/**
 * Validates whether the Groq API key is configured on the server.
 */
export function isGroqConfigured(): boolean {
  return Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== "");
}

/**
 * Returns an initialized Groq client instance or throws a descriptive configuration error.
 */
function getGroqClient(timeoutMs = GROQ_REQUEST_TIMEOUT_MS): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("CONFIG_MISSING: GROQ_API_KEY is not configured on the server.");
  }
  return new Groq({
    apiKey: apiKey.trim(),
    timeout: timeoutMs,
    maxRetries: 1, // Conservative retries to avoid burning free-tier rate limits
  });
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/**
 * Checks whether an error represents a request timeout or abort condition.
 */
export function isTimeoutError(error: unknown): boolean {
  if (!error) return false;
  if (error instanceof Groq.APIConnectionTimeoutError || error instanceof Groq.APIUserAbortError) {
    return true;
  }
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
 * Checks whether an error represents a rate limit condition (HTTP 429).
 */
export function isRateLimitError(error: unknown): boolean {
  if (!error) return false;
  if (error instanceof Groq.RateLimitError) return true;
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes("429") || msg.includes("rate_limit_exceeded") || msg.includes("RATE_LIMITED");
}

/**
 * Checks whether an error represents an authentication failure (HTTP 401).
 */
export function isAuthError(error: unknown): boolean {
  if (!error) return false;
  if (error instanceof Groq.AuthenticationError) return true;
  const msg = error instanceof Error ? error.message : String(error);
  return msg.includes("401") || msg.includes("invalid_api_key") || msg.includes("Invalid API Key");
}

/**
 * Checks whether an error represents a service unavailable or upstream connection error.
 */
export function isServiceUnavailableError(error: unknown): boolean {
  if (!error) return false;
  if (
    error instanceof Groq.InternalServerError ||
    error instanceof Groq.APIConnectionError
  ) {
    return true;
  }
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("503") ||
    msg.includes("UNAVAILABLE") ||
    msg.includes("Connection error") ||
    msg.includes("fetch failed")
  );
}

/**
 * Dispatches a photography conversation prompt to Groq using groq-sdk.
 *
 * @param message The user's current message (validated to <= 500 characters).
 * @param history Recent conversation history (capped to maximum 6 prior turns).
 * @param timeoutMs Request timeout in milliseconds (default 25,000ms).
 */
export async function sendPhotographyMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  timeoutMs = GROQ_REQUEST_TIMEOUT_MS
): Promise<string> {
  const client = getGroqClient(timeoutMs);
  const model = process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL;

  // Build the message sequence starting with the mentor system instruction
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    {
      role: "system",
      content: PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION,
    },
  ];

  // Append validated recent history turns in chronological order
  for (const item of history) {
    if (item.content && item.content.trim() !== "") {
      messages.push({
        role: item.role,
        content: item.content.trim(),
      });
    }
  }

  // Append current user message
  messages.push({
    role: "user",
    content: message.trim(),
  });

  try {
    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: GROQ_MAX_OUTPUT_TOKENS,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply || reply.trim() === "") {
      throw new Error("EMPTY_RESPONSE: Model returned an empty response.");
    }

    return reply.trim();
  } catch (error) {
    if (isTimeoutError(error)) {
      throw new Error("GATEWAY_TIMEOUT: Groq API request timed out.");
    }
    throw error;
  }
}

