import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PoliticalService } from './political.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Political')
@Controller('political')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PoliticalController {
  constructor(private readonly politicalService: PoliticalService) {}

  // ===== CAMPAIGN ENDPOINTS =====

  @Post('campaign')
  @ApiOperation({ summary: 'Create a campaign' })
  createCampaign(@Request() req: any, @Body() dto: CreateCampaignDto) {
    return this.politicalService.createCampaign(req.user.id, dto);
  }

  @Get('campaigns')
  @ApiOperation({ summary: 'Get all campaigns' })
  getCampaigns(@Query('workspaceId') workspaceId?: string) {
    return this.politicalService.getCampaigns(workspaceId);
  }

  @Get('campaign/:id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  getCampaignById(@Param('id') id: string) {
    return this.politicalService.getCampaignById(id);
  }

  @Patch('campaign/:id')
  @ApiOperation({ summary: 'Update campaign' })
  updateCampaign(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.politicalService.updateCampaign(id, dto);
  }

  @Delete('campaign/:id')
  @ApiOperation({ summary: 'Delete campaign' })
  deleteCampaign(@Param('id') id: string) {
    return this.politicalService.deleteCampaign(id);
  }

  // ===== CONTENT ENDPOINTS =====

  @Post('content')
  @ApiOperation({ summary: 'Create content' })
  createContent(@Request() req: any, @Body() dto: CreateContentDto) {
    return this.politicalService.createContent(req.user.id, dto);
  }

  @Get('contents')
  @ApiOperation({ summary: 'Get all contents' })
  getContents(@Query('campaignId') campaignId?: string) {
    return this.politicalService.getContents(campaignId);
  }

  @Get('content/:id')
  @ApiOperation({ summary: 'Get content by ID' })
  getContentById(@Param('id') id: string) {
    return this.politicalService.getContentById(id);
  }

  @Patch('content/:id')
  @ApiOperation({ summary: 'Update content' })
  updateContent(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.politicalService.updateContent(id, dto);
  }

  @Delete('content/:id')
  @ApiOperation({ summary: 'Delete content' })
  deleteContent(@Param('id') id: string) {
    return this.politicalService.deleteContent(id);
  }

  // ===== BOOTH ENDPOINTS =====

  @Post('campaign/:campaignId/booth')
  @ApiOperation({ summary: 'Create a booth' })
  createBooth(
    @Param('campaignId') campaignId: string,
    @Request() req: any,
    @Body() dto: any,
  ) {
    return this.politicalService.createBooth(req.user.id, campaignId, dto);
  }

  @Get('booths')
  @ApiOperation({ summary: 'Get all booths' })
  getBooths(@Query('campaignId') campaignId?: string) {
    return this.politicalService.getBooths(campaignId);
  }

  // ===== MEDIA COVERAGE ENDPOINTS =====

  @Post('campaign/:campaignId/media')
  @ApiOperation({ summary: 'Create media coverage' })
  createMediaCoverage(
    @Param('campaignId') campaignId: string,
    @Request() req: any,
    @Body() dto: any,
  ) {
    return this.politicalService.createMediaCoverage(req.user.id, campaignId, dto);
  }

  @Get('media')
  @ApiOperation({ summary: 'Get all media coverages' })
  getMediaCoverages(@Query('campaignId') campaignId?: string) {
    return this.politicalService.getMediaCoverages(campaignId);
  }
}