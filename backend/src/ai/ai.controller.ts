import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MatchingService } from './matching.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('ai')
export class AiController {
  constructor(
    private matchingService: MatchingService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('recommendations')
  async getRecommendations(@Request() req) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    const opportunities = await this.prisma.opportunity.findMany();
    return this.matchingService.match(user, opportunities);
  }

  // Keep any existing endpoints (like /intelligence, /design) if needed
}