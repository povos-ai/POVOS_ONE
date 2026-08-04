import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(dto: SearchDto) {
    const {
      query,
      workspaceId,
      category,
      type,
      status,
      level,
      state,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = dto;

    const where: any = {};

    // Workspace filter
    if (workspaceId) {
      where.workspaceId = workspaceId;
    }

    // Text search
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { searchText: { contains: query, mode: 'insensitive' } },
      ];
    }

    // Filters
    if (category) where.category = category;
    if (type) where.type = type;
    if (status) where.status = status;
    if (level) where.level = level;
    if (state) where.state = { contains: state, mode: 'insensitive' };

    const [items, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          workspace: {
            select: {
              id: true,
              name: true,
              slug: true,
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
        query,
        category,
        type,
        status,
        level,
        state,
      },
    };
  }
}