export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatRequestBody {
  message: string;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatResponseBody {
  reply: string;
}

export interface ChatErrorResponse {
  error: string;
  code?:
    | "CONFIG_MISSING"
    | "INVALID_REQUEST"
    | "RATE_LIMITED"
    | "SERVICE_UNAVAILABLE"
    | "SERVER_ERROR"
    | "GATEWAY_TIMEOUT";
}

