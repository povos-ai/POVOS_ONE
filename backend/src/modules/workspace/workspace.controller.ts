import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Workspaces')
@Controller('workspaces')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workspaces for current user' })
  async getUserWorkspaces(@Request() req: any) {
    return this.workspaceService.getUserWorkspaces(req.user.id);
  }
}