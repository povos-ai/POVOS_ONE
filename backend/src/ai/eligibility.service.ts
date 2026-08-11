import { Injectable } from '@nestjs/common';
import { User, Opportunity } from '@prisma/client';

@Injectable()
export class EligibilityService {
  calculateMatch(user: User, opp: Opportunity): number {
    let score = 0;
    let totalWeight = 0;

    // 1. Category match (35%)
    if (user.category && opp.category) {
      totalWeight += 35;
      if (user.category === opp.category) {
        score += 35;
      } else {
        // partial match if similar categories (e.g., GRANT vs SUBSIDY)
        score += 10;
      }
    }

    // 2. Location match (25%)
    if (user.state) {
      totalWeight += 25;
      if (opp.state === 'All India' || user.state === opp.state) {
        score += 25;
      } else if (opp.state && opp.state.includes(user.state)) {
        score += 15; // partial
      } else {
        score += 5; // some default
      }
    }

    // 3. Education (15%) – simplified check
    if (user.education) {
      totalWeight += 15;
      const edu = user.education.toLowerCase();
      const desc = opp.description?.toLowerCase() || '';
      if (desc.includes(edu)) {
        score += 15;
      } else {
        score += 5;
      }
    }

    // 4. Income / Social Category (15%)
    if (user.income || user.category) {
      totalWeight += 15;
      const userCat = user.category?.toLowerCase() || '';
      const oppCat = opp.category?.toLowerCase() || '';
      if (userCat && oppCat && (userCat === oppCat || oppCat.includes(userCat))) {
        score += 15;
      } else {
        score += 5;
      }
    }

    // 5. Deadline urgency (10%)
    if (opp.lastDate) {
      totalWeight += 10;
      const now = new Date();
      const daysLeft = (new Date(opp.lastDate).getTime() - now.getTime()) / (1000*60*60*24);
      if (daysLeft <= 7) {
        score += 10;  // urgent
      } else if (daysLeft <= 30) {
        score += 6;
      } else {
        score += 2;
      }
    }

    // Avoid division by zero
    if (totalWeight === 0) return 0;

    // Ensure score is integer and within 0-100
    return Math.min(100, Math.round((score / totalWeight) * 100));
  }
}
