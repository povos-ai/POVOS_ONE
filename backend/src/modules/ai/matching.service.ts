import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EligibilityService } from './eligibility.service';
import { GeminiService } from './gemini.service';
import { PersonalizationService } from './personalization.service';
import { User } from '@prisma/client';

@Injectable()
export class MatchingService {
  constructor(
    private prisma: PrismaService,
    private eligibilityService: EligibilityService,
    private geminiService: GeminiService,
    private personalizationService: PersonalizationService,
  ) {}

  async getRecommendations(user: User, limit = 10) {
    const opportunities = await this.prisma.opportunity.findMany({
      where: { status: 'OPEN' },
    });
    const scored = await Promise.all(opportunities.map(async opp => {
      const eligibilityResult = this.eligibilityService.calculateMatch(user, opp);
      const signals = await this.personalizationService.computeSignals(user, opp);
      // Eligibility score: 0-100, contributes 50% of final score
      const eligibilityScore = eligibilityResult.score;
      // Personalization boost: max 50 (since total personalization weight = 50%)
      const boost = signals.totalBoost;
      // Final score = (eligibilityScore * 0.5) + boost
      const finalScore = (eligibilityScore * 0.5) + boost;
      return {
        ...opp,
        matchScore: eligibilityScore, // keep original for backward compatibility
        matchReasons: eligibilityResult.reasons,
        matchLevel: this.getMatchLevel(eligibilityScore),
        personalizedScore: Math.min(100, Math.round(finalScore)),
        personalizationReasons: signals.reasons,
      };
    }));
    const sorted = scored.sort((a, b) => b.personalizedScore - a.personalizedScore);
    const top = sorted.slice(0, limit);

    // Generate Gemini explanations for top 3 (existing)
    const withExplanations = await Promise.all(
      top.slice(0, 3).map(async (item) => {
        try {
          const explanation = await this.geminiService.generateExplanation(user, item, item.matchReasons);
          return { ...item, explanation };
        } catch {
          return { ...item, explanation: 'Explanation temporarily unavailable.' };
        }
      })
    );
    const remaining = top.slice(3).map(item => ({ ...item, explanation: null }));
    return [...withExplanations, ...remaining];
  }

  private getMatchLevel(score: number): string {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Strong Match';
    if (score >= 60) return 'Good Match';
    return 'Potential Match';
  }
}
