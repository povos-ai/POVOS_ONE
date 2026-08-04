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
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SubmitBusinessDto } from './dto/submit-business.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Business')
@Controller('business')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  // ===== BUSINESS SUBMISSION ENDPOINTS (Place FIRST) =====

  @Post('submit')
  @ApiOperation({ summary: 'Submit application to business opportunity' })
  submitApplication(@Request() req: any, @Body() dto: SubmitBusinessDto) {
    return this.businessService.submitApplication(req.user.id, dto);
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Get all business submissions' })
  getSubmissions(@Request() req: any) {
    return this.businessService.getSubmissions(req.user.id);
  }

  @Get('submissions/:id')
  @ApiOperation({ summary: 'Get business submission by ID' })
  getSubmissionById(@Param('id') id: string, @Request() req: any) {
    return this.businessService.getSubmissionById(id, req.user.id);
  }

  // ===== BUSINESS OPPORTUNITY ENDPOINTS =====

  @Post()
  @ApiOperation({ summary: 'Create a business opportunity' })
  create(@Request() req: any, @Body() dto: CreateBusinessDto) {
    return this.businessService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all business opportunities' })
  findAll(@Query('workspaceId') workspaceId?: string) {
    return this.businessService.findAll(workspaceId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search business opportunities' })
  search(@Query('q') query: string, @Query('workspaceId') workspaceId?: string) {
    return this.businessService.search(query, workspaceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get business opportunity by ID' })
  findById(@Param('id') id: string) {
    return this.businessService.findById(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get business opportunity by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.businessService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update business opportunity' })
  update(@Param('id') id: string, @Body() dto: UpdateBusinessDto) {
    return this.businessService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete business opportunity' })
  delete(@Param('id') id: string) {
    return this.businessService.delete(id);
  }
}