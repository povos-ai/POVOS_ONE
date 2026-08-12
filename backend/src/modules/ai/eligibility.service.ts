import { Injectable } from '@nestjs/common';
import { User, Opportunity } from '@prisma/client';

@Injectable()
export class EligibilityService {
  calculateMatch(user: User, opp: Opportunity): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;
    let totalWeight = 0;

    if (user.state && opp.state) {
      totalWeight += 25;
      if (opp.state === 'All India' || user.state === opp.state) {
        score += 25;
        reasons.push('State eligibility matched');
      } else {
        score += 5;
        reasons.push('State not matched (partial)');
      }
    }

    if (user.category && opp.category) {
      totalWeight += 20;
      if (user.category === opp.category) {
        score += 20;
        reasons.push('Category matched');
      } else {
        score += 5;
        reasons.push('Category differs');
      }
    }

    if (user.education && opp.description?.toLowerCase().includes(user.education.toLowerCase())) {
      totalWeight += 15;
      score += 15;
      reasons.push('Education background relevant');
    } else if (user.education) {
      totalWeight += 15;
      score += 5;
      reasons.push('Education not directly matched');
    }

    if (user.userType && opp.description?.toLowerCase().includes(user.userType.toLowerCase())) {
      totalWeight += 15;
      score += 15;
      reasons.push('User type aligns with opportunity');
    } else if (user.userType) {
      totalWeight += 15;
      score += 5;
      reasons.push('User type not explicitly mentioned');
    }

    if (opp.lastDate) {
      totalWeight += 10;
      const daysLeft = Math.ceil((new Date(opp.lastDate).getTime() - Date.now()) / (1000*60*60*24));
      if (daysLeft <= 7) {
        score += 10;
        reasons.push('Deadline approaching – act soon');
      } else if (daysLeft <= 30) {
        score += 6;
        reasons.push('Deadline within a month');
      } else {
        score += 2;
      }
    }

    if (user.interests) {
      const interests = user.interests.split(',').map(i => i.trim().toLowerCase());
      const oppCat = opp.category?.toLowerCase() || '';
      if (interests.some(i => oppCat.includes(i) || opp.title?.toLowerCase().includes(i))) {
        totalWeight += 15;
        score += 15;
        reasons.push('Matches your interests');
      } else {
        totalWeight += 15;
        score += 3;
        reasons.push('Interest match weak');
      }
    }

    if (totalWeight === 0) return { score: 0, reasons: ['No criteria matched'] };

    const finalScore = Math.min(100, Math.round((score / totalWeight) * 100));
    return { score: finalScore, reasons };
  }
}
