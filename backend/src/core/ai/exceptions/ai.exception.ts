export interface AiExceptionOptions {
  statusCode?: number;
  error?: string;
  provider?: string;
  details?: unknown;
}

export class AiException extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly provider?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: AiExceptionOptions = {},
  ) {
    super(message);

    this.name = 'AiException';

    this.statusCode = options.statusCode ?? 500;
    this.error = options.error ?? 'AI_ERROR';
    this.provider = options.provider;
    this.details = options.details;
  }
}