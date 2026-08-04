import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private openai: OpenAI;
  private model: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.model = this.configService.get<string>('OPENAI_MODEL', 'gpt-4o-mini');

    if (apiKey && apiKey.startsWith('sk-')) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log(`✅ OpenAI initialized with model: ${this.model}`);
    } else {
      this.logger.warn('⚠️ OPENAI_API_KEY not found. Using mock responses.');
    }
  }

  health() {
    return {
      status: this.openai ? 'ok' : 'degraded',
      service: 'OpenAI',
      model: this.model,
      timestamp: new Date().toISOString(),
    };
  }

  async generateText(prompt: string): Promise<string> {
    this.logger.log(`🤖 Generating text with OpenAI...`);

    if (!this.openai) {
      return `[Mock] OpenAI response for: ${prompt.substring(0, 30)}...`;
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || 'No response';
    } catch (error: any) {
      this.logger.error(`❌ OpenAI generation failed: ${error.message}`);
      throw error;
    }
  }

  async generateOpportunitySummary(description: string): Promise<string> {
    const prompt = `Summarize this opportunity in 2-3 sentences:\n${description}`;
    return this.generateText(prompt);
  }

  async generateOpportunity(topic: string): Promise<any> {
    this.logger.log(`🤖 Generating opportunity for: ${topic}`);

    const prompt = `You are an opportunity intelligence expert. Generate a detailed opportunity based on: "${topic}"

Return ONLY valid JSON format:
{
  "title": "Descriptive title",
  "slug": "url-friendly-slug",
  "description": "Detailed description",
  "category": "SCHEME",
  "type": "SCHEME",
  "level": "STATE",
  "state": "Bihar",
  "district": "Patna",
  "eligibility": { "criteria": "Who can apply" },
  "benefits": { "description": "What are the benefits" }
}`;

    try {
      const response = await this.generateText(prompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return this.getFallbackOpportunity(topic);
    } catch (error) {
      this.logger.error(`❌ Opportunity generation failed: ${error.message}`);
      return this.getFallbackOpportunity(topic);
    }
  }

  private getFallbackOpportunity(topic: string): any {
    return {
      title: `${topic} - Generate Opportunity`,
      slug: topic.toLowerCase().replace(/\s+/g, '-'),
      description: `This opportunity is related to ${topic}.`,
      category: 'SCHEME',
      type: 'SCHEME',
      level: 'STATE',
      state: 'Bihar',
      district: 'Patna',
      eligibility: { criteria: 'Eligibility criteria' },
      benefits: { description: 'Benefits description' },
    };
  }
}