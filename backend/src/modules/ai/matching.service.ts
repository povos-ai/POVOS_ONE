import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EligibilityService } from './eligibility.service';
import { User } from '@prisma/client';

@Injectable()
export class MatchingService {
  constructor(
    private prisma: PrismaService,
    private eligibilityService: EligibilityService,
  ) {}

  async getRecommendations(user: User, limit = 10) {
    const opportunities = await this.prisma.opportunity.findMany({
      where: { status: 'OPEN' },
    });
    const scored = opportunities.map(opp => {
      const result = this.eligibilityService.calculateMatch(user, opp);
      return {
        ...opp,
        matchScore: result.score,
        matchReasons: result.reasons,
        matchLevel: this.getMatchLevel(result.score),
      };
    });
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  private getMatchLevel(score: number): string {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Strong Match';
    if (score >= 60) return 'Good Match';
    return 'Potential Match';
  }
}
