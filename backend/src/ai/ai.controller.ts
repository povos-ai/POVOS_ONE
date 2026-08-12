import { Controller, Post, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { MatchingService } from './matching.service';

@Controller('ai')
export class AiController {
  constructor(
    private prisma: PrismaService,
    private matchingService: MatchingService,
  ) {}

  @Post('intelligence')
  @UseGuards(JwtAuthGuard)
  async getIntelligence(@Request() req) {
    return { matches: 0, highConfidence: 0, strongestMatch: '' };
  }

  @Post('design')
  @UseGuards(JwtAuthGuard)
  async getDesign(@Body() body: any) {
    return { design: 'AI design placeholder' };
  }

  @Post('recommendations')
  @UseGuards(JwtAuthGuard)
  async getRecommendations(@Request() req) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.matchingService.getRecommendations(user);
  }
}
