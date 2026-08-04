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
import { PlannerService } from './planner.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PlannerStatus } from '@prisma/client';

@ApiTags('Planner')
@Controller('planner')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a planner item' })
  create(@Request() req: any, @Body() dto: CreatePlannerDto) {
    return this.plannerService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planner items' })
  findAll(@Request() req: any, @Query('workspaceId') workspaceId?: string) {
    return this.plannerService.findAll(req.user.id, workspaceId);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming items' })
  getUpcoming(@Request() req: any, @Query('days') days?: string) {
    return this.plannerService.getUpcoming(req.user.id, days ? parseInt(days) : 7);
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Get overdue items' })
  getOverdue(@Request() req: any) {
    return this.plannerService.getOverdue(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get planner item by ID' })
  findById(@Param('id') id: string, @Request() req: any) {
    return this.plannerService.findById(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update planner item' })
  update(@Param('id') id: string, @Request() req: any, @Body() dto: UpdatePlannerDto) {
    return this.plannerService.update(id, req.user.id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update planner item status' })
  updateStatus(
    @Param('id') id: string,
    @Request() req: any,
    @Body('status') status: PlannerStatus,
  ) {
    return this.plannerService.updateStatus(id, req.user.id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete planner item' })
  delete(@Param('id') id: string, @Request() req: any) {
    return this.plannerService.delete(id, req.user.id);
  }
}