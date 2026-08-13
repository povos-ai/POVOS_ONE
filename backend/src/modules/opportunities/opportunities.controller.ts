import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  create(@Body() createOpportunityDto: any) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.opportunitiesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpportunityDto: any) {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunitiesService.remove(id);
  }
}
