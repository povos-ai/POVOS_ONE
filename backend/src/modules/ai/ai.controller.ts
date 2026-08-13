import { Controller, Post, Body, Get, Delete, Param, UseGuards, Request, NotFoundException, BadRequestException, UnauthorizedException, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { MatchingService } from './matching.service';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  private readonly logger = new Logger(AiController.name);

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
  async getRecommendations() {
    const user = await this.prisma.user.findUnique({
      where: { email: 'demo@povos.com' },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.matchingService.getRecommendations(user);
  }

  @Post('feedback')
  @UseGuards(JwtAuthGuard)
  async createOrUpdateFeedback(@Request() req, @Body() body: { opportunityId: string; feedback: boolean }) {
    try {
      this.logger.log('req.user:', req.user);
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated or missing userId');
      }
      const userId = req.user.userId;
      const { opportunityId, feedback } = body;
      if (!opportunityId) throw new BadRequestException('opportunityId is required');
      if (typeof feedback !== 'boolean') throw new BadRequestException('feedback must be a boolean');

      const opportunity = await this.prisma.opportunity.findUnique({ where: { id: opportunityId } });
      if (!opportunity) throw new NotFoundException('Opportunity not found');

      const existing = await this.prisma.feedback.findFirst({
        where: { userId, opportunityId },
      });

      let result;
      if (existing) {
        result = await this.prisma.feedback.update({
          where: { id: existing.id },
          data: { feedback },
        });
      } else {
        result = await this.prisma.feedback.create({
          data: {
            feedback,
            user: { connect: { id: userId } },
            opportunity: { connect: { id: opportunityId } },
          },
        });
      }

      return { success: true, feedback: result };
    } catch (error) {
      this.logger.error('Feedback error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('feedback')
  @UseGuards(JwtAuthGuard)
  async getUserFeedback(@Request() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated or missing userId');
      }
      const userId = req.user.userId;
      const feedbacks = await this.prisma.feedback.findMany({
        where: { userId },
        select: { opportunityId: true, feedback: true },
      });
      return { feedback: feedbacks };
    } catch (error) {
      this.logger.error('Get feedback error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('feedback/:opportunityId')
  @UseGuards(JwtAuthGuard)
  async deleteFeedback(@Request() req, @Param('opportunityId') opportunityId: string) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated or missing userId');
      }
      const userId = req.user.userId;
      const existing = await this.prisma.feedback.findFirst({
        where: { userId, opportunityId },
      });
      if (!existing) throw new NotFoundException('Feedback not found');
      await this.prisma.feedback.delete({ where: { id: existing.id } });
      return { success: true };
    } catch (error) {
      this.logger.error('Delete feedback error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}

