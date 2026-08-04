import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HfInference } from '@huggingface/inference';

@Injectable()
export class HuggingFaceService {
  private readonly logger = new Logger(HuggingFaceService.name);
  private hf: HfInference;
  private model: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('HUGGINGFACE_API_KEY');
    this.model = this.configService.get<string>('HF_MODEL', 'meta-llama/Llama-3.2-3B-Instruct');

    if (apiKey) {
      this.hf = new HfInference(apiKey);
      this.logger.log(`✅ Hugging Face initialized with model: ${this.model}`);
    } else {
      this.logger.warn('⚠️ HUGGINGFACE_API_KEY not found. Using fallback.');
    }
  }

  health() {
    return {
      status: this.hf ? 'ok' : 'degraded',
      service: 'Hugging Face AI',
      model: this.model,
      timestamp: new Date().toISOString(),
    };
  }

  async generateText(prompt: string): Promise<string> {
    this.logger.log(`🤖 Generating text with Hugging Face...`);

    if (!this.hf) {
      return `[Mock] HF response for: ${prompt.substring(0, 30)}...`;
    }

    try {
      const response = await this.hf.textGeneration({
        model: this.model,
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
        },
      });

      return response.generated_text || 'No response';
    } catch (error: any) {
      this.logger.error(`❌ HF generation failed: ${error.message}`);
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