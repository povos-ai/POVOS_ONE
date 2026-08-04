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
import { AdminService } from './services/admin.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ===== DASHBOARD =====

  @Get('stats')
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  getStats() {
    return this.adminService.getStats();
  }

  @Get('recent-activity')
  @ApiOperation({ summary: 'Get recent activity' })
  getRecentActivity(@Query('limit') limit?: string) {
    return this.adminService.getRecentActivity(limit ? parseInt(limit) : 10);
  }

  // ===== USER MANAGEMENT =====

  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.adminService.updateUser(id, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  // ===== WORKSPACE MANAGEMENT =====

  @Get('workspaces')
  @ApiOperation({ summary: 'Get all workspaces' })
  getWorkspaces(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getWorkspaces(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('workspaces/:id')
  @ApiOperation({ summary: 'Get workspace by ID' })
  getWorkspaceById(@Param('id') id: string) {
    return this.adminService.getWorkspaceById(id);
  }

  @Delete('workspaces/:id')
  @ApiOperation({ summary: 'Delete workspace' })
  deleteWorkspace(@Param('id') id: string) {
    return this.adminService.deleteWorkspace(id);
  }

  // ===== OPPORTUNITY MANAGEMENT =====

  @Get('opportunities')
  @ApiOperation({ summary: 'Get all opportunities' })
  getOpportunities(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getOpportunities(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('opportunities/:id')
  @ApiOperation({ summary: 'Get opportunity by ID' })
  getOpportunityById(@Param('id') id: string) {
    return this.adminService.getOpportunityById(id);
  }

  @Patch('opportunities/:id')
  @ApiOperation({ summary: 'Update opportunity' })
  updateOpportunity(@Param('id') id: string, @Body() dto: UpdateOpportunityDto) {
    return this.adminService.updateOpportunity(id, dto);
  }

  @Delete('opportunities/:id')
  @ApiOperation({ summary: 'Delete opportunity' })
  deleteOpportunity(@Param('id') id: string) {
    return this.adminService.deleteOpportunity(id);
  }

  // ===== APPLICATION MANAGEMENT =====

  @Get('applications')
  @ApiOperation({ summary: 'Get all applications' })
  getApplications(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.adminService.getApplications(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get application by ID' })
  getApplicationById(@Param('id') id: string) {
    return this.adminService.getApplicationById(id);
  }

  @Patch('applications/:id/status')
  @ApiOperation({ summary: 'Update application status' })
  updateApplicationStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.adminService.updateApplicationStatus(id, status);
  }

  @Delete('applications/:id')
  @ApiOperation({ summary: 'Delete application' })
  deleteApplication(@Param('id') id: string) {
    return this.adminService.deleteApplication(id);
  }
}