import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('intelligence')
  async generateIntelligence(@Body() body: { opportunity: any }) {
    return this.aiService.generateOpportunityIntelligence(body.opportunity);
  }

  @Post('design')
  async generateDesign(@Body() body: { pageType: string; purpose: string; userType?: string }) {
    return this.aiService.generateDesignSchema(body);
  }
}
