import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { Prisma } from '@prisma/client';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  async create(@Body() data: Prisma.OpportunityCreateInput) {
    return this.opportunitiesService.create(data);
  }

  @Get()
  async findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.opportunitiesService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.OpportunityUpdateInput) {
    return this.opportunitiesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.opportunitiesService.remove(id);
  }

  @Get('search')
  async search(@Query() query: any) {
    return this.opportunitiesService.search(query);
  }
}
