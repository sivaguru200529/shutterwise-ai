import { ChatMessage } from "@/types/chat";

export const CHAT_STORAGE_KEY = "shutterwise_chat_history_v1";
export const MAX_STORED_MESSAGES = 50;

/**
 * Safely retrieves stored chat messages from browser localStorage.
 * Gracefully handles SSR environments, private browsing exceptions, and malformed JSON.
 */
export function loadStoredChatHistory(): ChatMessage[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter and sanitize entries
    const sanitized: ChatMessage[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        typeof item.timestamp === "number"
      ) {
        sanitized.push({
          id: typeof item.id === "string" ? item.id : `${item.timestamp}-${Math.random()}`,
          role: item.role,
          content: item.content,
          timestamp: item.timestamp,
        });
      }
    }

    return sanitized.slice(-MAX_STORED_MESSAGES);
  } catch (err) {
    console.warn("[ShutterWise Storage] Failed to load chat history:", err);
    return [];
  }
}

/**
 * Safely persists chat messages to browser localStorage.
 * Capped at MAX_STORED_MESSAGES. Never stores errors, loading states, or secrets.
 */
export function saveChatHistory(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;

  try {
    const validMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content.trim() !== "")
      .slice(-MAX_STORED_MESSAGES);

    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(validMessages));
  } catch (err) {
    console.warn("[ShutterWise Storage] Failed to save chat history:", err);
  }
}

/**
 * Clears stored chat history from localStorage.
 */
export function clearStoredChatHistory(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (err) {
    console.warn("[ShutterWise Storage] Failed to clear chat history:", err);
  }
}

