import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Opportunity } from '@prisma/client';

export interface PersonalizationSignals {
  totalBoost: number;
  reasons: string[];
  profileMatch: number;
  interestMatch: number;
  feedbackPreference: number;
  categoryPreference: number;
  freshness: number;
  deadlineRelevance: number;
}

@Injectable()
export class PersonalizationService {
  constructor(private prisma: PrismaService) {}

  async computeSignals(user: User, opportunity: Opportunity): Promise<PersonalizationSignals> {
    const reasons: string[] = [];
    let profileMatch = 0;
    let interestMatch = 0;
    let feedbackPreference = 0;
    let categoryPreference = 0;
    let freshness = 0;
    let deadlineRelevance = 0;

    // 1. Profile / Interest Match (20% weight)
    // Combine user state, education, businessType, and interests
    let profileScore = 0;
    let totalChecks = 0;

    if (user.state && opportunity.state && user.state === opportunity.state) {
      profileScore += 25;
      reasons.push('Your state matches');
    }
    if (user.education && opportunity.level && user.education.includes(opportunity.level)) {
      profileScore += 25;
      reasons.push('Your education level matches');
    }
    if (user.businessType && opportunity.type && user.businessType === opportunity.type) {
      profileScore += 25;
      reasons.push('Matches your business type');
    }
    // Interests: keyword overlap with title/description
    if (user.interests && (opportunity.title || opportunity.description)) {
      const interests = user.interests.split(',').map(i => i.trim().toLowerCase());
      const text = (opportunity.title + ' ' + (opportunity.description || '')).toLowerCase();
      let matches = 0;
      for (const interest of interests) {
        if (text.includes(interest)) matches++;
      }
      const interestScore = Math.min(25, (matches / Math.max(interests.length, 1)) * 25);
      profileScore += interestScore;
      if (interestScore > 0) reasons.push('Your interests align');
    }

    // Normalize profileMatch to 0-100
    profileMatch = Math.min(100, profileScore);
    // Weighted contribution: 20% of total = 20 points max, but we keep it as 0-100 for now.

    // 2. Feedback Preference (15% weight)
    // Aggregate feedback for similar opportunities (same category or type)
    if (opportunity.category || opportunity.type) {
      const similarOpportunities = await this.prisma.opportunity.findMany({
        where: {
          OR: [
            { category: opportunity.category },
            { type: opportunity.type },
          ],
          id: { not: opportunity.id },
        },
        select: { id: true },
      });
      const similarIds = similarOpportunities.map(o => o.id);
      if (similarIds.length > 0) {
        const feedbacks = await this.prisma.feedback.findMany({
          where: {
            userId: user.id,
            opportunityId: { in: similarIds },
          },
          select: { feedback: true },
        });
        const likes = feedbacks.filter(f => f.feedback === true).length;
        const dislikes = feedbacks.filter(f => f.feedback === false).length;
        const total = likes + dislikes;
        if (total > 0) {
          // Preference between -1 and 1, scale to 0-100 (with 50 as neutral)
          const net = (likes - dislikes) / total; // -1..1
          // Map to 0-100: 0=strong negative, 50=neutral, 100=strong positive
          feedbackPreference = 50 + (net * 50);
          if (feedbackPreference > 60) reasons.push('You liked similar opportunities');
          else if (feedbackPreference < 40) reasons.push('You disliked similar opportunities');
        }
      }
    }

    // 3. Category / Type Preference (10% weight) – implicit from user fields
    if (user.category && opportunity.category && user.category === opportunity.category) {
      categoryPreference = 100;
      reasons.push('Matches your preferred category');
    } else if (user.businessType && opportunity.type && user.businessType === opportunity.type) {
      categoryPreference = 80;
      reasons.push('Matches your business type');
    }

    // 4. Freshness (2.5% weight) – small boost for recently posted
    if (opportunity.createdAt) {
      const daysOld = (Date.now() - new Date(opportunity.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysOld < 30) {
        freshness = 100 * (1 - daysOld / 30);
        if (freshness > 50) reasons.push('Recently posted');
      }
    }

    // 5. Deadline Relevance (2.5% weight) – boost for closing soon
    if (opportunity.lastDate) {
      const daysLeft = (new Date(opportunity.lastDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysLeft > 0 && daysLeft <= 14) {
        deadlineRelevance = 100 * (1 - daysLeft / 14);
        if (deadlineRelevance > 50) reasons.push('Closing soon');
      }
    }

    // Now, combine signals into a total boost (0-100) using weights:
    // Eligibility will be 50%, so personalization total max = 50%
    // We'll compute a weighted sum of the signals, each normalized to 0-100,
    // then scale to a max of 50 points.
    const profileWeight = 0.20; // 20%
    const interestWeight = 0.15; // 15% (already included in profile? Actually we combined them)
    // We'll treat profileMatch as combined profile+interest.
    const feedbackWeight = 0.15;
    const categoryWeight = 0.10;
    const freshnessWeight = 0.025;
    const deadlineWeight = 0.025;

    // Sum of weights = 0.20+0.15+0.10+0.025+0.025 = 0.50 (50%)
    // So totalBoost = (profileMatch * 0.20) + (feedbackPreference * 0.15) + (categoryPreference * 0.10) + (freshness * 0.025) + (deadlineRelevance * 0.025)
    // But since profileMatch is already a combined 0-100 score, we use it directly.
    // Actually we should separate profile and interest to be clear.
    // We already computed profileMatch as combined, but we can separate them for clarity.

    // For simplicity, we'll use profileMatch as the combined profile+interest score.
    const totalBoost = (profileMatch * 0.20) + (feedbackPreference * 0.15) + (categoryPreference * 0.10) + (freshness * 0.025) + (deadlineRelevance * 0.025);

    // Cap at 50 (since eligibility is 50%, total max 100)
    const finalBoost = Math.min(50, totalBoost);

    return {
      totalBoost: finalBoost,
      reasons,
      profileMatch,
      interestMatch: 0, // we don't compute separately
      feedbackPreference,
      categoryPreference,
      freshness,
      deadlineRelevance,
    };
  }
}
