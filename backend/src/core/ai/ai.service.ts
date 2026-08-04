import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private configService: ConfigService) {
    // 🔥 Hardcoded API Key for testing
    const apiKey = 'AQ.Ab8RN6KdsuqT9t8dCDqbqBPtp-oomUAxfDlDsTsrkQzMIUf75A';
    
    if (apiKey && apiKey.startsWith('AQ.')) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
          model: 'gemini-2.0-flash', // ✅ Correct model
        });
        this.logger.log('✅ Gemini AI initialized successfully');
      } catch (error) {
        this.logger.error(`❌ Failed to initialize Gemini: ${error.message}`);
      }
    } else {
      this.logger.warn('⚠️ Valid Gemini API Key not found. AI features will use mock responses.');
    }
  }

  /**
   * Health check for AI service
   */
  health() {
    return {
      status: 'ok',
      service: 'AI Service',
      provider: 'gemini',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate text using AI
   */
  async generateText(prompt: string): Promise<string> {
    this.logger.log(`🤖 Generating text for prompt: ${prompt.substring(0, 50)}...`);

    if (!this.model) {
      this.logger.warn('⚠️ Gemini not configured. Using mock response.');
      return `AI generated response for: ${prompt.substring(0, 30)}...`;
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error: any) {
      this.logger.error(`❌ AI generation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Chat with AI
   */
  async chat(message: string): Promise<any> {
    this.logger.log(`💬 Chat request received`);

    if (!this.model) {
      return {
        response: `AI chat response for: ${message?.substring(0, 30)}...`,
      };
    }

    try {
      const result = await this.model.generateContent(message);
      const response = result.response;
      return {
        response: response.text(),
      };
    } catch (error: any) {
      this.logger.error(`❌ Chat failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate opportunity summary
   */
  async generateOpportunitySummary(description: string): Promise<string> {
    this.logger.log(`📝 Generating opportunity summary`);

    if (!this.model) {
      return `AI generated response for: Summarize this opportunity in 2-3 sentences:\n${description}`;
    }

    try {
      const prompt = `Summarize this opportunity in 2-3 sentences:\n${description}`;
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error: any) {
      this.logger.error(`❌ Summary generation failed: ${error.message}`);
      return `Summary generation failed: ${error.message}`;
    }
  }

  /**
   * Generate a complete opportunity using AI
   */
  async generateOpportunity(topic: string): Promise<any> {
    this.logger.log(`🤖 Generating opportunity for topic: ${topic}`);

    const prompt = `
You are an opportunity intelligence expert. Generate a detailed opportunity/scheme based on the topic: "${topic}"

Return ONLY valid JSON format. No markdown, no explanation, no code blocks.

{
  "title": "Descriptive title of the opportunity",
  "slug": "url-friendly-slug-using-dashes",
  "description": "Detailed description of the opportunity in 2-3 sentences",
  "category": "SCHEME",
  "type": "SCHEME",
  "level": "STATE",
  "state": "Bihar",
  "district": "Patna",
  "eligibility": { "criteria": "Who can apply for this opportunity" },
  "benefits": { "description": "What are the benefits" }
}`;

    try {
      const response = await this.generateText(prompt);

      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      let jsonString = response;

      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }

      // Clean up the JSON string
      jsonString = jsonString
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(jsonString);
      this.logger.log(`✅ Generated opportunity: ${parsed.title}`);
      return parsed;
    } catch (error: any) {
      this.logger.error(`❌ Opportunity generation failed: ${error.message}`);

      // Return a fallback opportunity
      return {
        title: `${topic} - Generate Opportunity`,
        slug: topic.toLowerCase().replace(/\s+/g, '-'),
        description: `This opportunity is related to ${topic}. Please fill in the details.`,
        category: 'SCHEME',
        type: 'SCHEME',
        level: 'STATE',
        state: 'Bihar',
        district: 'Patna',
        eligibility: { criteria: 'Eligibility criteria for this opportunity' },
        benefits: { description: 'Benefits of this opportunity' },
      };
    }
  }

  /**
   * Generate multiple opportunities
   */
  async generateMultipleOpportunities(topics: string[]): Promise<any[]> {
    const opportunities: any[] = [];
    for (const topic of topics) {
      this.logger.log(`Generating opportunity for: ${topic}`);
      const opp = await this.generateOpportunity(topic);
      if (opp) {
        opportunities.push(opp);
      }
    }
    return opportunities;
  }
}