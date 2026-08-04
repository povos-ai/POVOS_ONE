import { registerAs } from '@nestjs/config';

export default registerAs('ai', () => ({
  enabled: process.env.AI_ENABLED === 'true',

  provider: process.env.AI_DEFAULT_PROVIDER ?? 'openai',

  timeout: Number(process.env.AI_TIMEOUT ?? 60000),

  maxRetries: Number(process.env.AI_MAX_RETRIES ?? 3),

  streaming: process.env.AI_ENABLE_STREAMING === 'true',

  cache: process.env.AI_ENABLE_CACHE === 'true',

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    defaultModel: process.env.OPENAI_DEFAULT_MODEL ?? 'gpt-5.5',
    fastModel: process.env.OPENAI_FAST_MODEL ?? 'gpt-5.5-mini',
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    defaultModel: process.env.GEMINI_DEFAULT_MODEL ?? 'gemini-2.5-pro',
    fastModel: process.env.GEMINI_FAST_MODEL ?? 'gemini-2.5-flash',
  },

  claude: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultModel: process.env.CLAUDE_DEFAULT_MODEL ?? 'claude-sonnet-4',
    fastModel: process.env.CLAUDE_FAST_MODEL ?? 'claude-haiku-4',
  },
}));