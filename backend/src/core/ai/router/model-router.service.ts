import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ModelRouterService {
  constructor(private readonly configService: ConfigService) {}

  getDefaultProvider(): string {
    return this.configService.get<string>(
      'ai.provider',
      'openai',
    );
  }

  getDefaultModel(): string {
    const provider = this.getDefaultProvider();

    switch (provider) {
      case 'gemini':
        return this.configService.get<string>(
          'ai.gemini.defaultModel',
          'gemini-2.5-pro',
        );

      case 'claude':
        return this.configService.get<string>(
          'ai.claude.defaultModel',
          'claude-sonnet-4',
        );

      default:
        return this.configService.get<string>(
          'ai.openai.defaultModel',
          'gpt-5.5',
        );
    }
  }
}