export interface AiGenerateOptions {
  /**
   * Optional system instruction
   */
  systemPrompt?: string;

  /**
   * Creativity
   * Range: 0 - 2
   */
  temperature?: number;

  /**
   * Maximum output tokens
   */
  maxTokens?: number;

  /**
   * Top P sampling
   */
  topP?: number;

  /**
   * Stream response
   */
  stream?: boolean;
}

export interface AiTokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AiGenerateResponse {
  text: string;

  provider: string;

  model: string;

  usage?: AiTokenUsage;
}

export interface AiProvider {
  /**
   * Provider name
   */
  readonly provider: string;

  /**
   * Model name
   */
  readonly model: string;

  /**
   * Generate AI response
   */
  generate(
    prompt: string,
    options?: AiGenerateOptions,
  ): Promise<AiGenerateResponse>;

  /**
   * Health Check
   */
  healthCheck(): Promise<boolean>;
}