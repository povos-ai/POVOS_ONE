import { Injectable } from '@nestjs/common';
import { EligibilityService, EligibilityResult } from './eligibility.service';
import { PrismaService } from '../prisma/prisma.service';
import { User, Opportunity } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface MatchResult {
  opportunity: Opportunity;
  score: number;
  reasons: string[];
  breakdown: Record<string, number>;
  eligible: boolean;
}

@Injectable()
export class MatchingService {
  constructor(
    private eligibility: EligibilityService,
    private prisma: PrismaService,
  ) {}

  async match(user: User, opportunities: Opportunity[]): Promise<MatchResult[]> {
    const results: MatchResult[] = [];
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    for (const opp of opportunities) {
      // 1. Rule-based eligibility
      const evalResult = this.eligibility.evaluate(user, opp);
      if (!evalResult.eligible) {
        // Still include but with low score
        results.push({
          opportunity: opp,
          score: Math.round(evalResult.score * 0.5),
          reasons: evalResult.reasons,
          breakdown: evalResult.breakdown,
          eligible: false,
        });
        continue;
      }

      // 2. AI enhancement (only if eligible)
      let aiReasons: string[] = [];
      let aiScoreAdjust = 0;
      try {
        const prompt = `
User profile: age=${user.age || 'unknown'}, education=${user.education || 'unknown'}, income=${user.income || 'unknown'}, category=${user.category || 'unknown'}, state=${user.state || 'unknown'}, businessType=${user.businessType || 'unknown'}.
Opportunity: title=${opp.title}, description=${opp.description}, category=${opp.category || 'unknown'}, state=${opp.state || 'All India'}, lastDate=${opp.lastDate || 'unknown'}, type=${opp.type || 'unknown'}.
Based on the user profile and opportunity details, provide a match score adjustment (add/subtract up to 10 points to the rule-based score) and give 2-3 specific reasons why this user is a good fit. Return JSON: { adjustment: number, reasons: string[] }.
`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          aiScoreAdjust = Math.min(Math.max(parsed.adjustment || 0, -10), 10);
          aiReasons = parsed.reasons || [];
        }
      } catch (e) {
        // AI fails – use rule-based score only
        aiReasons = ['AI enhancement unavailable.'];
        aiScoreAdjust = 0;
      }

      // Final score = rule-based score + AI adjustment (capped 0-100)
      let finalScore = evalResult.score + aiScoreAdjust;
      finalScore = Math.min(Math.max(finalScore, 0), 100);

      results.push({
        opportunity: opp,
        score: Math.round(finalScore),
        reasons: [...evalResult.reasons, ...aiReasons].slice(0, 5),
        breakdown: evalResult.breakdown,
        eligible: true,
      });
    }

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score);
  }
}