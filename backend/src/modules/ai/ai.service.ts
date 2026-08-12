import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  // ===== OPPORTUNITY INTELLIGENCE =====
  async generateOpportunityIntelligence(opportunity: any) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `
You are an expert government scheme analyst. Extract structured intelligence.

Opportunity:
Title: ${opportunity.title}
Description: ${opportunity.description}
Category: ${opportunity.category}
Type: ${opportunity.type}
State: ${opportunity.state}
District: ${opportunity.district}

Return JSON:
{
  "summary": "2-3 sentence summary",
  "eligibility": ["list", "of", "criteria"],
  "benefits": ["list", "of", "benefits"],
  "requiredDocuments": ["list", "of", "documents"],
  "applicationProcess": "step-by-step process",
  "targetUsers": ["who should apply"],
  "tags": ["relevant", "tags"]
}
Return ONLY JSON.
`;
      const result = await model.generateContent(prompt);
      const text = (await result.response).text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('No valid JSON');
    } catch (error) {
      console.error('Gemini API Error:', error.message);
      throw error;
    }
  }

  // ===== DESIGN SCHEMA GENERATOR =====
  async generateDesignSchema({ pageType, purpose, userType }: { pageType: string; purpose: string; userType?: string }) {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `
You are a design expert for an enterprise platform called POVOS ONE.
Given:
- Page Type: ${pageType}
- Purpose: ${purpose}
- User Type: ${userType || 'general'}

Generate a design schema in JSON format:
{
  "theme": "modern-government" | "corporate" | "minimal" | "vibrant",
  "layout": "single-column" | "two-column" | "dashboard",
  "hero": {
    "style": "visual-left-content-right" | "center-content" | "full-width-image",
    "heading": "string",
    "subheading": "string",
    "cta": "string"
  },
  "components": [
    { "type": "hero" | "search" | "filter" | "grid" | "card" | "stats" | "activity" | "chart", "order": number, "config": {} }
  ],
  "colorPalette": "blue" | "green" | "orange" | "purple",
  "typography": "modern" | "classic" | "bold"
}
Return ONLY JSON.
`;
      const result = await model.generateContent(prompt);
      const text = (await result.response).text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('No valid JSON');
    } catch (error) {
      console.error('Gemini Design API Error:', error.message);
      throw error;
    }
    }
}
