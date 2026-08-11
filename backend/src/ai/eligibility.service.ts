import { Injectable } from '@nestjs/common';
import { User, Opportunity } from '@prisma/client';

export interface EligibilityResult {
  score: number;              // 0-100
  breakdown: Record<string, number>; // factor weights
  reasons: string[];
  eligible: boolean;
}

@Injectable()
export class EligibilityService {
  // Weights for each factor (sum = 100)
  private readonly weights = {
    profileMatch: 35,
    location: 15,
    education: 10,
    income: 10,
    category: 10,
    deadline: 5,
    other: 15,
  };

  evaluate(user: User, opp: Opportunity): EligibilityResult {
    const reasons: string[] = [];
    const breakdown: Record<string, number> = {};

    // 1. Profile category match
    let profileMatchScore = 0;
    if (user.category && opp.category) {
      if (user.category === opp.category) {
        profileMatchScore = this.weights.profileMatch;
        reasons.push('Your profile category matches this opportunity.');
      } else {
        profileMatchScore = 0;
        reasons.push('Your profile category does not match.');
      }
    } else {
      profileMatchScore = this.weights.profileMatch * 0.5;
      reasons.push('Profile category not specified – partial score.');
    }
    breakdown.profileMatch = profileMatchScore;

    // 2. Location match
    let locationScore = 0;
    if (user.state && opp.state) {
      if (opp.state === 'All India' || user.state === opp.state) {
        locationScore = this.weights.location;
        reasons.push('Location is eligible.');
      } else {
        locationScore = 0;
        reasons.push('Location is not eligible.');
      }
    } else {
      locationScore = this.weights.location * 0.5;
      reasons.push('Location not specified – partial score.');
    }
    breakdown.location = locationScore;

    // 3. Education fit (simple: if user.education matches opportunity.education? we don't have that field yet)
    // For now, give half points
    let educationScore = this.weights.education * 0.5;
    if (user.education) {
      educationScore = this.weights.education;
      reasons.push('Education information provided.');
    } else {
      reasons.push('Education not specified – partial score.');
    }
    breakdown.education = educationScore;

    // 4. Income fit (if opportunity has income criteria, not implemented yet)
    let incomeScore = this.weights.income * 0.7;
    if (user.income) {
      incomeScore = this.weights.income;
      reasons.push('Income information provided.');
    } else {
      reasons.push('Income not specified – partial score.');
    }
    breakdown.income = incomeScore;

    // 5. Social category (if opportunity has category restrictions)
    let categoryScore = this.weights.category * 0.8;
    if (user.category) {
      categoryScore = this.weights.category;
      reasons.push('Social category provided.');
    } else {
      reasons.push('Social category not specified – partial score.');
    }
    breakdown.category = categoryScore;

    // 6. Deadline urgency (bonus if deadline is soon)
    let deadlineScore = 0;
    if (opp.lastDate) {
      const now = new Date();
      const daysLeft = (new Date(opp.lastDate).getTime() - now.getTime()) / (1000*60*60*24);
      if (daysLeft > 0 && daysLeft < 30) {
        deadlineScore = this.weights.deadline;
        reasons.push(`Deadline approaching (${Math.ceil(daysLeft)} days left).`);
      } else if (daysLeft >= 30) {
        deadlineScore = this.weights.deadline * 0.5;
        reasons.push('Deadline is far away.');
      } else {
        reasons.push('Deadline has passed – not eligible.');
        deadlineScore = 0;
      }
    } else {
      deadlineScore = this.weights.deadline * 0.5;
      reasons.push('No deadline specified.');
    }
    breakdown.deadline = deadlineScore;

    // 7. Other (business type, stage, etc.) – simplified
    let otherScore = 0;
    if (user.businessType && opp.type) {
      if (user.businessType === opp.type) {
        otherScore = this.weights.other;
        reasons.push('Business type matches opportunity type.');
      } else {
        otherScore = this.weights.other * 0.3;
        reasons.push('Business type may not align.');
      }
    } else {
      otherScore = this.weights.other * 0.3;
      reasons.push('Business type not specified.');
    }
    breakdown.other = otherScore;

    // Total score (cap at 100)
    let totalScore = Object.values(breakdown).reduce((a, b) => a + b, 0);
    totalScore = Math.min(totalScore, 100);

    const eligible = totalScore >= 40; // threshold

    return {
      score: Math.round(totalScore),
      breakdown,
      reasons: reasons.slice(0, 5), // keep top 5
      eligible,
    };
  }
}