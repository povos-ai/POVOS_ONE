import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  health() {
    return {
      status: 'ok',
      service: 'AI Service',
      provider: 'gemini',
      timestamp: new Date().toISOString(),
    };
  }

  async generateText(prompt: string): Promise<string> {
    this.logger.log(`🤖 Generating text for prompt: ${prompt.substring(0, 50)}...`);

    try {
      // TODO: Implement actual Gemini API call
      return `AI generated response for: ${prompt.substring(0, 30)}...`;
    } catch (error) {
      this.logger.error(`❌ AI generation failed: ${error.message}`);
      throw error;
    }
  }

  async chat(dto: any): Promise<any> {
    this.logger.log(`💬 Chat request received`);

    try {
      return {
        response: `AI chat response for: ${dto.message?.substring(0, 30)}...`,
      };
    } catch (error) {
      this.logger.error(`❌ Chat failed: ${error.message}`);
      throw error;
    }
  }

  async generateOpportunitySummary(description: string): Promise<string> {
    this.logger.log(`📝 Generating opportunity summary`);

    try {
      const prompt = `Summarize this opportunity in 2-3 sentences:\n${description}`;
      return this.generateText(prompt);
    } catch (error) {
      this.logger.error(`❌ Summary generation failed: ${error.message}`);
      return `Summary generation failed: ${error.message}`;
    }
  }
}