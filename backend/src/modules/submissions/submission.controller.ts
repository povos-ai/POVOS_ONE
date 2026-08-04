import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { SubmissionStatus } from '@prisma/client';

@ApiTags('Submissions')
@Controller('submissions')
@UseGuards(ThrottlerGuard)
@ApiBearerAuth()
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiResponse({ status: 201, description: 'Submission created successfully' })
  create(@Body() dto: CreateSubmissionDto) {
    return this.submissionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, description: 'List of submissions' })
  findAll() {
    return this.submissionService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get submissions by user ID' })
  findByUserId(@Param('userId') userId: string) {
    return this.submissionService.findByUserId(userId);
  }

  @Get('opportunity/:opportunityId')
  @ApiOperation({ summary: 'Get submissions by opportunity ID' })
  findByOpportunityId(@Param('opportunityId') opportunityId: string) {
    return this.submissionService.findByOpportunityId(opportunityId);
  }

  @Get('workspace/:workspaceId')
  @ApiOperation({ summary: 'Get submissions by workspace ID' })
  findByWorkspaceId(@Param('workspaceId') workspaceId: string) {
    return this.submissionService.findByWorkspaceId(workspaceId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get submission statistics' })
  getStats() {
    return this.submissionService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get submission by ID' })
  @ApiResponse({ status: 200, description: 'Submission details' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  findOne(@Param('id') id: string) {
    return this.submissionService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update submission' })
  @ApiResponse({ status: 200, description: 'Submission updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    return this.submissionService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update submission status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: SubmissionStatus,
  ) {
    return this.submissionService.updateStatus(id, status);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit an application (DRAFT → SUBMITTED)' })
  @ApiResponse({ status: 200, description: 'Application submitted successfully' })
  submit(@Param('id') id: string) {
    return this.submissionService.submit(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete submission' })
  @ApiResponse({ status: 200, description: 'Submission deleted successfully' })
  remove(@Param('id') id: string) {
    return this.submissionService.delete(id);
  }
}