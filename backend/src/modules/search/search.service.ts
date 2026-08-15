import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from './dto/search.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, filters: SearchDto = {}) {
    const where: Prisma.OpportunityWhereInput = {};

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
      ];
    }

    if (filters.category) where.category = filters.category;
    if (filters.type) where.type = filters.type;
    if (filters.status) where.status = filters.status;
    if (filters.state) where.state = filters.state;
    if (filters.district) where.district = filters.district;
    if (filters.workspaceId) where.workspaceId = filters.workspaceId;

    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'lastDate', 'startDate'];
    const sortBy = (filters.sortBy && allowedSortFields.includes(filters.sortBy))
      ? filters.sortBy
      : 'createdAt';
    const sortOrder = (filters.sortOrder === 'asc' || filters.sortOrder === 'desc')
      ? filters.sortOrder
      : 'desc';

    const orderBy: Prisma.OpportunityOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const page = (filters.page && parseInt(String(filters.page)) > 0) ? parseInt(String(filters.page)) : 1;
    const limit = (filters.limit && parseInt(String(filters.limit)) > 0) ? parseInt(String(filters.limit)) : 10;
    const skip = (page - 1) * limit;
    const take = limit;

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

    return { items, total };
  }
}

