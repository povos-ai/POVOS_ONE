import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('score')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async calculateMatchScore(
    @Request() req,
    @Body() body: { opportunityId: string },
  ) {
    return this.matchService.calculateMatchScore(req.user.id, body.opportunityId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUserMatches(@Request() req) {
    return this.matchService.getUserMatches(req.user.id);
  }

  @Get('opportunity/:opportunityId')
  @UseGuards(JwtAuthGuard)
  async getOpportunityMatches(@Param('opportunityId') opportunityId: string) {
    return this.matchService.getOpportunityMatches(opportunityId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMatch(@Param('id') id: string) {
    return this.matchService.getMatch(id);
  }
}