export interface AiGenerateOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  stream?: boolean;
}

export interface AiGenerateResponse {
  text: string;
  provider: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface AiProvider {
  readonly provider: string;

  generate(
    prompt: string,
    options?: AiGenerateOptions,
  ): Promise<AiGenerateResponse>;
}