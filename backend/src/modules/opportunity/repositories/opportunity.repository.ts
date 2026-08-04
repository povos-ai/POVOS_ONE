import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class OpportunityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OpportunityCreateInput) {
    console.log('==============================');
    console.log('REPOSITORY CREATE INPUT');
    console.log(JSON.stringify(data, null, 2));
    console.log('==============================');

    return this.prisma.opportunity.create({
      data,
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.opportunity.findMany({
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.opportunity.findUnique({
      where: { id },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.OpportunityUpdateInput) {
    return this.prisma.opportunity.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.opportunity.delete({
      where: { id },
    });
  }

  // ===== RECOMMENDATION ENGINE METHODS =====

  async getuserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...user,
      state: '',
      district: '',
      metadata: {},
    };
  }

  async findActiveOpportunities(filters?: { state?: string; category?: string }) {
    const where: any = {
      status: 'PUBLISHED',
    };

    if (filters?.state) {
      where.state = filters.state;
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    return this.prisma.opportunity.findMany({
      where,
      take: 30,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        level: true,
        state: true,
        district: true,
        type: true,
        status: true,
        published: true,
        createdAt: true,
      },
    });
  }

  async findByIds(ids: string[]) {
    return this.prisma.opportunity.findMany({
      where: {
        id: { in: ids },
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  // ✅ New: Find by slug
  async findBySlug(slug: string) {
    return this.prisma.opportunity.findUnique({
      where: { slug },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  }
}