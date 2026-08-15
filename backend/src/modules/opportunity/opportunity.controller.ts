import { Controller, Get, Post, Body, UseGuards, Request, Param, NotFoundException } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    return this.opportunityService.findAll(req.user.userId);
  }

  @Get('slug/:slug')
  @UseGuards(JwtAuthGuard)
  async findBySlug(@Param('slug') slug: string, @Request() req) {
    return this.opportunityService.findBySlug(slug, req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() body: any) {
    console.log('🔥🔥🔥 CONTROLLER CREATE CALLED 🔥🔥🔥');
    console.log('📦 userId:', req.user.userId);
    console.log('📦 body:', JSON.stringify(body));
    return this.opportunityService.create(body, req.user.userId);
  }
}
