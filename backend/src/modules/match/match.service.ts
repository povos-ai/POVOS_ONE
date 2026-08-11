import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(private prisma: PrismaService) {}

  // ============================================
  // 1. Calculate Match Score
  // ============================================
  async calculateMatchScore(userId: string, opportunityId: string) {
    try {
      const [user, opportunity] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
        }),
        this.prisma.opportunity.findUnique({
          where: { id: opportunityId },
          include: {
            workspace: true,
          },
        }),
      ]);

      if (!user || !opportunity) {
        throw new NotFoundException('User or Opportunity not found');
      }

      const profileMatch = this.calculateProfileMatch(user);
      const skillMatch = this.calculateSkillMatch(user, opportunity);
      const locationMatch = this.calculateLocationMatch(user, opportunity);
      const experienceMatch = this.calculateExperienceMatch(user, opportunity);
      const educationMatch = this.calculateEducationMatch(user, opportunity);

      const scores = { profileMatch, skillMatch, locationMatch, experienceMatch, educationMatch };
      const weights = { profileMatch: 0.30, skillMatch: 0.25, locationMatch: 0.15, experienceMatch: 0.15, educationMatch: 0.15 };

      let totalScore = 0;
      for (const [key, value] of Object.entries(scores)) {
        totalScore += value * weights[key as keyof typeof weights];
      }

      const finalScore = Math.round(totalScore * 100);

      const recommendations: string[] = [];
      if (profileMatch < 0.5) recommendations.push('Update your profile to better match this opportunity');
      if (skillMatch < 0.4) recommendations.push('Consider upskilling in relevant areas');
      if (locationMatch < 0.3) recommendations.push('Consider relocation or remote work options');
      if (experienceMatch < 0.4) recommendations.push('Gain more experience through internships or projects');
      if (educationMatch < 0.4) recommendations.push('Consider taking relevant courses or certifications');
      if (finalScore > 70) recommendations.push('Great match! You are well aligned with this opportunity');
      else if (finalScore > 50) recommendations.push('You have a decent match. Consider improving the areas mentioned above');
      else recommendations.push('Consider exploring other opportunities that better match your profile');

      return {
        success: true,
        data: {
          score: finalScore,
          scores,
          recommendations,
          opportunity: {
            id: opportunity.id,
            title: opportunity.title,
            type: opportunity.type,
            category: opportunity.category,
          },
        },
      };
    } catch (error) {
      this.logger.error(`Error calculating match score: ${error.message}`);
      throw error;
    }
  }

  // ============================================
  // 2. Get User Matches
  // ============================================
  async getUserMatches(userId: string) {
    return { success: true, data: [], count: 0, message: 'Match model not configured' };
  }

  // ============================================
  // 3. Get Opportunity Matches
  // ============================================
  async getOpportunityMatches(opportunityId: string) {
    return { success: true, data: [], count: 0, message: 'Match model not configured' };
  }

  // ============================================
  // 4. Get Single Match
  // ============================================
  async getMatch(id: string) {
    return { success: true, data: null, message: 'Match model not configured' };
  }

  // ============================================
  // Helper Methods
  // ============================================
  private calculateProfileMatch(user: any): number {
    let score = 0, total = 0;
    if (user.firstName && user.lastName) { score += 0.3; total += 0.3; }
    if (user.email) { score += 0.2; total += 0.2; }
    if (user.phone) { score += 0.2; total += 0.2; }
    if (user.emailVerified) { score += 0.3; total += 0.3; }
    return total > 0 ? score / total : 0;
  }

  private calculateSkillMatch(user: any, opportunity: any): number { return 0.6; }
  private calculateLocationMatch(user: any, opportunity: any): number { return 0.5; }
  private calculateExperienceMatch(user: any, opportunity: any): number { return 0.4; }
  private calculateEducationMatch(user: any, opportunity: any): number { return 0.5; }
}