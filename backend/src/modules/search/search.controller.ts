import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Search')
@Controller('search')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({
    summary: 'Universal Search',
    description: 'Search across all opportunities with filters and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully',
  })
  async search(@Query() dto: SearchDto, @Request() req: any) {
    // Use current workspace if not specified
    if (!dto.workspaceId && req.user?.activeWorkspaceId) {
      dto.workspaceId = req.user.activeWorkspaceId;
    }
    return this.searchService.search(dto);
  }
}