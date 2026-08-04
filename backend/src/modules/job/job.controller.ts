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
import { JobService } from './job.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ApplyJobDto } from './dto/apply-job.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApplicationStatus } from '@prisma/client';

@ApiTags('Job')
@Controller('job')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // ===== RESUME ENDPOINTS =====

  @Post('resume')
  @ApiOperation({ summary: 'Upload resume' })
  createResume(@Request() req: any, @Body() dto: CreateResumeDto) {
    return this.jobService.createResume(req.user.id, dto);
  }

  @Get('resume')
  @ApiOperation({ summary: 'Get all resumes' })
  getResumes(@Request() req: any) {
    return this.jobService.getResumes(req.user.id);
  }

  @Get('resume/:id')
  @ApiOperation({ summary: 'Get resume by ID' })
  getResumeById(@Param('id') id: string, @Request() req: any) {
    return this.jobService.getResumeById(id, req.user.id);
  }

  @Delete('resume/:id')
  @ApiOperation({ summary: 'Delete resume' })
  deleteResume(@Param('id') id: string, @Request() req: any) {
    return this.jobService.deleteResume(id, req.user.id);
  }

  // ===== JOB APPLICATION ENDPOINTS =====

  @Post('apply')
  @ApiOperation({ summary: 'Apply to a job' })
  applyToJob(@Request() req: any, @Body() dto: ApplyJobDto) {
    return this.jobService.applyToJob(req.user.id, dto);
  }

  @Get('applications')
  @ApiOperation({ summary: 'Get all job applications' })
  getApplications(@Request() req: any) {
    return this.jobService.getApplications(req.user.id);
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get application by ID' })
  getApplicationById(@Param('id') id: string, @Request() req: any) {
    return this.jobService.getApplicationById(id, req.user.id);
  }

  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update application status' })
  updateApplicationStatus(
    @Param('id') id: string,
    @Request() req: any,
    @Body('status') status: ApplicationStatus,
  ) {
    return this.jobService.updateApplicationStatus(id, req.user.id, status);
  }

  @Post('applications/:id/withdraw')
  @ApiOperation({ summary: 'Withdraw application' })
  withdrawApplication(@Param('id') id: string, @Request() req: any) {
    return this.jobService.withdrawApplication(id, req.user.id);
  }

  // ===== JOB MATCHING =====

  @Get('matches')
  @ApiOperation({ summary: 'Get job matches' })
  getJobMatches(@Request() req: any) {
    return this.jobService.getJobMatches(req.user.id);
  }
}