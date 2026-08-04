import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './services/dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('admin')
  @ApiOperation({ summary: 'Get admin dashboard stats' })
  async getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }

  @Get('workspace')
  @ApiOperation({ summary: 'Get workspace dashboard stats' })
  async getWorkspaceDashboard(@Request() req: any) {
    return this.dashboardService.getWorkspaceDashboard(req.user.id);
  }

  @Get('applicant')
  @ApiOperation({ summary: 'Get applicant dashboard stats' })
  async getApplicantDashboard(@Request() req: any) {
    return this.dashboardService.getApplicantDashboard(req.user.id);
  }
}