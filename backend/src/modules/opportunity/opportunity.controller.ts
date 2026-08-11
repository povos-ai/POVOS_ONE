import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Get()
  async findAll() {
    return this.opportunityService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() body: any) {
    return this.opportunityService.create(body, req.user.id);
  }
}
