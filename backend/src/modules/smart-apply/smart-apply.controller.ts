import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SmartApplyService } from './smart-apply.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { SmartApplyDto, BulkApplyDto } from './dto/smart-apply.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApplicationStatus } from '@prisma/client';

@ApiTags('SmartApply')
@Controller('smart-apply')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SmartApplyController {
  constructor(private readonly smartApplyService: SmartApplyService) {}

  // ===== TEMPLATE ENDPOINTS =====

  @Post('template')
  @ApiOperation({ summary: 'Create application template' })
  createTemplate(@Request() req: any, @Body() dto: CreateTemplateDto) {
    return this.smartApplyService.createTemplate(req.user.id, dto);
  }

  @Get('templates')
  @ApiOperation({ summary: 'Get all templates' })
  getTemplates(@Request() req: any) {
    return this.smartApplyService.getTemplates(req.user.id);
  }

  @Get('template/default')
  @ApiOperation({ summary: 'Get default template' })
  getDefaultTemplate(@Request() req: any) {
    return this.smartApplyService.getDefaultTemplate(req.user.id);
  }

  @Get('template/:id')
  @ApiOperation({ summary: 'Get template by ID' })
  getTemplateById(@Param('id') id: string, @Request() req: any) {
    return this.smartApplyService.getTemplateById(id, req.user.id);
  }

  @Delete('template/:id')
  @ApiOperation({ summary: 'Delete template' })
  deleteTemplate(@Param('id') id: string, @Request() req: any) {
    return this.smartApplyService.deleteTemplate(id, req.user.id);
  }

  // ===== SMART APPLY ENDPOINTS =====

  @Post('apply')
  @ApiOperation({ summary: 'Smart apply to opportunity' })
  smartApply(@Request() req: any, @Body() dto: SmartApplyDto) {
    return this.smartApplyService.smartApply(req.user.id, dto);
  }

  @Post('bulk-apply')
  @ApiOperation({ summary: 'Bulk apply to opportunities' })
  bulkApply(@Request() req: any, @Body() dto: BulkApplyDto) {
    return this.smartApplyService.bulkApply(req.user.id, dto);
  }

  @Get('applications')
  @ApiOperation({ summary: 'Get all applications' })
  getApplications(@Request() req: any) {
    return this.smartApplyService.getApplications(req.user.id);
  }

  @Get('applications/stats')
  @ApiOperation({ summary: 'Get application statistics' })
  getStats(@Request() req: any) {
    return this.smartApplyService.getStats(req.user.id);
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get application by ID' })
  getApplicationById(@Param('id') id: string, @Request() req: any) {
    return this.smartApplyService.getApplicationById(id, req.user.id);
  }

  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update application status' })
  updateApplicationStatus(
    @Param('id') id: string,
    @Request() req: any,
    @Body('status') status: ApplicationStatus,
  ) {
    return this.smartApplyService.updateApplicationStatus(id, req.user.id, status);
  }
}