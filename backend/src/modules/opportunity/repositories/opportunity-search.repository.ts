import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { SearchOpportunityDto } from '../dto/search-opportunity.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OpportunitySearchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: SearchOpportunityDto) {
    const {
      search,           // âœ… 'search' use à¤•à¤°à¥‡à¤‚, 'q' à¤¨à¤¹à¥€à¤‚
      category,
      type,
      status,
      level,
      state,
      district,
      workspaceName,
      published,
      startDateFrom,
      startDateTo,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = dto;

    // Build where clause
    const where: Prisma.OpportunityWhereInput = {};

    // Full-text search
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Filters
    if (category) where.category = category;
    if (type) where.type = type;
    if (status) where.status = status;
    if (level) where.level = level;
    if (state) where.state = { contains: state };
    if (district) where.district = { contains: district };
    
    if (workspaceName) {
      where.workspace = {
        name: { contains: workspaceName },
      };
    }

    if (published !== undefined) {
      where.published = published === 'true';
    }

    if (startDateFrom || startDateTo) {
      where.startDate = {};
      if (startDateFrom) {
        where.startDate.gte = new Date(startDateFrom);
      }
      if (startDateTo) {
        where.startDate.lte = new Date(startDateTo);
      }
    }

    // Build orderBy
    const orderBy: Prisma.OpportunityOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Execute queries
    const [items, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          workspace: {
            select: {
              id: true,
              name: true,
              },
          },
        },
      }),
      this.prisma.opportunity.count({ where }),
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        search,
        category,
        type,
        status,
        level,
        state,
        district,
        workspaceName,
        published,
        startDateFrom,
        startDateTo,
      },
    };
  }
}
