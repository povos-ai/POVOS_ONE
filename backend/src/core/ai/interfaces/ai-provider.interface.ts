export interface ChatRequest {
  message: string;
  systemPrompt?: string;
}

export interface ChatResponse {
  text: string;
  provider: string;
  model: string;
}

export interface AiProvider {
  chat(request: ChatRequest): Promise<ChatResponse>;
}