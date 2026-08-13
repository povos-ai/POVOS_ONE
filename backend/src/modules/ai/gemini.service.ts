import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey && apiKey !== 'your-api-key-here') {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async generateExplanation(user: any, opportunity: any, matchReasons: string[]): Promise<string> {
    if (!this.genAI) {
      return 'Gemini API key not configured.';
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `
You are an AI assistant for an opportunity discovery platform.
Explain why the following opportunity is a good match for the user.

User profile:
- State: ${user.state || 'Not provided'}
- Education: ${user.education || 'Not provided'}
- User type: ${user.userType || 'Not provided'}
- Business type: ${user.businessType || 'Not provided'}
- Interests: ${user.interests || 'Not provided'}

Opportunity:
- Title: ${opportunity.title}
- Description: ${opportunity.description || 'No description'}
- Category: ${opportunity.category}
- Type: ${opportunity.type}
- State: ${opportunity.state || 'All India'}

Match reasons:
${matchReasons.map(r => `- ${r}`).join('\n')}

Generate a short, friendly, natural-language explanation (max 2 sentences) that tells the user why this opportunity is relevant to them.
Do not simply list the match reasons; use them to form a cohesive explanation.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text || 'Explanation not available.';
    } catch (error) {
      console.error('Gemini error:', error);
      return 'Explanation temporarily unavailable.';
    }
  }
}
