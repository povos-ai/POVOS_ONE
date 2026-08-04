import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'AI generated response for: ' + prompt.substring(0, 100) + '...';
    }
  }
}