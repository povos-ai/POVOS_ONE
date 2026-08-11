import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EligibilityService } from './eligibility.service';
import { User, Opportunity } from '@prisma/client';

@Injectable()
export class MatchingService {
  constructor(
    private prisma: PrismaService,
    private eligibilityService: EligibilityService,
  ) {}

  async match(user: User, opportunities: Opportunity[]) {
    return opportunities.map((opp) => ({
      ...opp,
      matchScore: this.eligibilityService.calculateMatch(user, opp),
    }));
  }
}
