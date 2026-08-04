import { Provider } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

export const GEMINI_PROVIDER = 'GEMINI_PROVIDER';

export const geminiProvider: Provider = {
  provide: GEMINI_PROVIDER,
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    return new GoogleGenerativeAI(apiKey);
  },
  inject: [ConfigService],
};