import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../../../core/ai/ai.service';
import { Opportunity } from '@prisma/client';

@Injectable()
export class OpportunityIntelligenceService {
  private readonly logger = new Logger(OpportunityIntelligenceService.name);

  constructor(private readonly aiService: AiService) {}

  async generateSummary(opportunity: Opportunity): Promise<string> {
    this.logger.log(`🤖 Generating AI summary for: ${opportunity.title}`);

    try {
      const prompt = this.buildSummaryPrompt(opportunity);
      const summary = await this.aiService.generateText(prompt);

      this.logger.log(`✅ Summary generated successfully`);
      return summary;
    } catch (error) {
      this.logger.error(`❌ Summary generation failed: ${error.message}`);
      throw error;
    }
  }

  async calculateScore(opportunity: Opportunity): Promise<number> {
    this.logger.log(`📊 Calculating score for: ${opportunity.title}`);

    try {
      const prompt = this.buildScorePrompt(opportunity);
      const response = await this.aiService.generateText(prompt);

      const score = this.extractScore(response);
      this.logger.log(`✅ Score calculated: ${score}/100`);

      return Math.min(Math.max(score, 0), 100);
    } catch (error) {
      this.logger.error(`❌ Score calculation failed: ${error.message}`);
      return 50;
    }
  }

  async extractKeywords(opportunity: Opportunity): Promise<string[]> {
    this.logger.log(`🔑 Extracting keywords for: ${opportunity.title}`);

    try {
      const prompt = this.buildKeywordsPrompt(opportunity);
      const response = await this.aiService.generateText(prompt);

      const keywords = this.parseKeywords(response);
      this.logger.log(`✅ Keywords extracted: ${keywords.length}`);

      return keywords;
    } catch (error) {
      this.logger.error(`❌ Keyword extraction failed: ${error.message}`);
      return this.fallbackKeywords(opportunity);
    }
  }

  async checkEligibility(
    opportunity: Opportunity,
    userProfile: any,
  ): Promise<{ eligible: boolean; score: number; reasons: string[] }> {
    this.logger.log(`🎯 Checking eligibility for: ${opportunity.title}`);

    try {
      const prompt = this.buildEligibilityPrompt(opportunity, userProfile);
      const response = await this.aiService.generateText(prompt);

      const result = this.parseEligibilityResponse(response);
      this.logger.log(`✅ Eligibility checked: ${result.eligible}`);

      return result;
    } catch (error) {
      this.logger.error(`❌ Eligibility check failed: ${error.message}`);
      return {
        eligible: false,
        score: 0,
        reasons: ['Eligibility check failed'],
      };
    }
  }

  private buildSummaryPrompt(opportunity: Opportunity): string {
    return `Generate a concise AI summary (2-3 sentences) for this opportunity:
Title: ${opportunity.title}
Description: ${opportunity.description}
Category: ${opportunity.category}
Type: ${opportunity.type}
Level: ${opportunity.level}
State: ${opportunity.state || 'N/A'}

Summary:`;
  }

  private buildScorePrompt(opportunity: Opportunity): string {
    return `Rate this opportunity on a scale of 0-100 based on:
- Clarity of description
- Scope and reach (Local/National/International)
- Impact potential
- Innovation level

Opportunity: ${opportunity.title}
Description: ${opportunity.description}
Category: ${opportunity.category}
Type: ${opportunity.type}
Level: ${opportunity.level}

Return only a number between 0-100.`;
  }

  private buildKeywordsPrompt(opportunity: Opportunity): string {
    return `Extract 5-7 relevant keywords from this opportunity:
Title: ${opportunity.title}
Description: ${opportunity.description}
Category: ${opportunity.category}
Type: ${opportunity.type}

Return keywords as a comma-separated list.`;
  }

  private buildEligibilityPrompt(opportunity: Opportunity, userProfile: any): string {
    return `Check if user is eligible for this opportunity:
Opportunity: ${opportunity.title}
Description: ${opportunity.description}
Eligibility: ${JSON.stringify(opportunity.eligibility)}

user Profile: ${JSON.stringify(userProfile)}

Return in JSON format:
{
  "eligible": true/false,
  "score": 0-100,
  "reasons": ["reason1", "reason2"]
}`;
  }

  private extractScore(response: string): number {
    const match = response.match(/\d+/);
    return match ? parseInt(match[0]) : 50;
  }

  private parseKeywords(response: string): string[] {
    return response
      .split(',')
      .map((k) => k?.trim?.()?.toLowerCase?.() || '')
      .filter((k): k is string => k !== null && k !== undefined && k.length > 0);
  }

  private fallbackKeywords(opportunity: Opportunity): string[] {
    const keywords = [
      opportunity.title,
      opportunity.category,
      opportunity.type,
      opportunity.state,
    ].filter((k): k is string => k !== null && k !== undefined && k.length > 0);

    return keywords.map((k) => k.toLowerCase());
  }

  private parseEligibilityResponse(response: string): {
    eligible: boolean;
    score: number;
    reasons: string[];
  } {
    try {
      const parsed = JSON.parse(response);
      return {
        eligible: parsed.eligible || false,
        score: parsed.score || 0,
        reasons: parsed.reasons || [],
      };
    } catch {
      return {
        eligible: false,
        score: 0,
        reasons: ['Unable to parse eligibility check'],
      };
    }
  }
}