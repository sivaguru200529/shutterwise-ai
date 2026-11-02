import { GoogleGenAI } from "@google/genai";
import { PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION } from "./system-prompt";

// Recommended default model supporting the Gemini Developer API free tier
export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

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
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/**
 * Dispatches a photography conversation prompt to the Gemini API using @google/genai.
 *
 * @param message The user's current message (validated to <= 500 characters).
 * @param history Recent conversation history (capped to maximum 6 prior turns).
 * @param timeoutMs Request timeout in milliseconds (default 15,000ms).
 */
export async function sendPhotographyMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  timeoutMs = 15000
): Promise<string> {
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

  // Execute request with timeout protection
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("GATEWAY_TIMEOUT: Gemini API request timed out."));
    }, timeoutMs);
  });

  const apiCallPromise = ai.models.generateContent({
    model: modelName,
    contents,
    config: {
      systemInstruction: PHOTOGRAPHY_MENTOR_SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });

  const response = await Promise.race([apiCallPromise, timeoutPromise]);

  const replyText = response.text;
  if (!replyText || replyText.trim() === "") {
    throw new Error("EMPTY_RESPONSE: Model returned an empty response.");
  }

  return replyText.trim();
}

