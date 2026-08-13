import { Controller, Post, Body, Get, Param, Put, Patch, Request, UseGuards } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto, UpdateSubmissionDto, UpdateStatusDto } from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() dto: CreateSubmissionDto) {
    const userId = req.user.userId; // now req.user is populated by JwtStrategy
    return this.submissionsService.create(userId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.submissionsService.findAllForUser(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.submissionsService.findOneForUser(userId, id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    const userId = req.user.userId;
    return this.submissionsService.update(userId, id, dto);
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  submit(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.submissionsService.submit(userId, id);
  }

  // Admin endpoints – protected by JWT Auth + Role Check
  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAllAdmin() {
    return this.submissionsService.findAllForAdmin();
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findOneAdmin(@Param('id') id: string) {
    return this.submissionsService.findOneForAdmin(id);
  }

  @Patch('admin/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.submissionsService.updateStatus(id, dto);
  }
}

