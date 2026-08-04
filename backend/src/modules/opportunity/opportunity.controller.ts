import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ThrottlerGuard } from '@nestjs/throttler';

import { OpportunityService } from './opportunity.service';
import { OpportunityIntelligenceService } from './services/opportunity-intelligence.service';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { SearchOpportunityDto } from './dto/search-opportunity.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Opportunity')
@Controller('opportunities')
@UseGuards(ThrottlerGuard)
export class OpportunityController {
  constructor(
    private readonly opportunityService: OpportunityService,
    private readonly intelligenceService: OpportunityIntelligenceService,
  ) {}

  @Get('health')
  @ApiOperation({
    summary: 'Opportunity Module Health Check',
  })
  health() {
    return this.opportunityService.health();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create Opportunity',
  })
  @ApiResponse({
    status: 201,
    description: 'Opportunity created successfully',
  })
  create(@Body() dto: CreateOpportunityDto) {
    return this.opportunityService.create(dto);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Search Opportunities with advanced filters',
    description: 'Full-text search with pagination, sorting, and filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully',
  })
  search(@Query() dto: SearchOpportunityDto) {
    return this.opportunityService.search(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get All Opportunities',
  })
  findAll() {
    return this.opportunityService.findAll();
  }

  @Get('recommendations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get useralized opportunity recommendations',
    description: 'AI-powered recommendations based on user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommendations generated successfully',
  })
  async getRecommendations(@Request() req: any) {
    const userId = req.user.id;
    return this.opportunityService.getRecommendations(userId);
  }

  @Get('slug/:slug')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get Opportunity by Slug',
    description: 'Fetch opportunity details using its unique slug',
  })
  @ApiResponse({
    status: 200,
    description: 'Opportunity found',
  })
  @ApiResponse({
    status: 404,
    description: 'Opportunity not found',
  })
  async findBySlug(@Param('slug') slug: string) {
    return this.opportunityService.findBySlug(slug);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get Opportunity by ID',
  })
  findOne(@Param('id') id: string) {
    return this.opportunityService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update Opportunity',
  })
  update(@Param('id') id: string, @Body() dto: UpdateOpportunityDto) {
    return this.opportunityService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete Opportunity',
  })
  remove(@Param('id') id: string) {
    return this.opportunityService.delete(id);
  }

  // ===== AI INTELLIGENCE ENDPOINTS =====

  @Get(':id/summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Generate AI summary for an opportunity',
  })
  async generateSummary(@Param('id') id: string) {
    const opportunity = await this.opportunityService.findById(id);
    
    if (!opportunity) {
      return {
        statusCode: 404,
        message: `Opportunity with ID ${id} not found`,
        error: 'Not Found',
      };
    }
    
    const summary = await this.intelligenceService.generateSummary(opportunity);
    return {
      opportunityId: id,
      summary,
    };
  }

  @Get(':id/score')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Calculate AI score for an opportunity',
  })
  async calculateScore(@Param('id') id: string) {
    const opportunity = await this.opportunityService.findById(id);
    
    if (!opportunity) {
      return {
        statusCode: 404,
        message: `Opportunity with ID ${id} not found`,
        error: 'Not Found',
      };
    }
    
    const score = await this.intelligenceService.calculateScore(opportunity);
    return {
      opportunityId: id,
      score,
    };
  }

  @Get(':id/keywords')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Extract keywords from an opportunity',
  })
  async extractKeywords(@Param('id') id: string) {
    const opportunity = await this.opportunityService.findById(id);
    
    if (!opportunity) {
      return {
        statusCode: 404,
        message: `Opportunity with ID ${id} not found`,
        error: 'Not Found',
      };
    }
    
    const keywords = await this.intelligenceService.extractKeywords(opportunity);
    return {
      opportunityId: id,
      keywords,
    };
  }
}