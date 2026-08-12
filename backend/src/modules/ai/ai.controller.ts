import { Controller, Post, Body, Request, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchingService } from './matching.service';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
    private readonly matchingService: MatchingService,
  ) {}

  @Post('intelligence')
  async generateIntelligence(@Body() body: { opportunity: any }) {
    return this.aiService.generateOpportunityIntelligence(body.opportunity);
  }

  @Post('design')
  async generateDesign(@Body() body: { pageType: string; purpose: string; userType?: string }) {
    return this.aiService.generateDesignSchema(body);
  }

  @Post('recommendations')
  async getRecommendations(@Request() req) {
    // For now, we'll use a test user (we'll add auth later)
    const testUser = await this.prisma.user.findUnique({
      where: { email: 'demo@povos.com' },
    });
    if (!testUser) throw new NotFoundException('Test user not found');
    return this.matchingService.getRecommendations(testUser);
  }
}
