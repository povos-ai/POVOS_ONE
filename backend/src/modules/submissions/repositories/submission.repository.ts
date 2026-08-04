import { Injectable } from '@nestjs/common';
import { Prisma, SubmissionStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class SubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SubmissionCreateInput) {
    return this.prisma.submission.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.submission.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            title: true,
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
    return this.prisma.submission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      include: {
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByOpportunityId(opportunityId: string) {
    return this.prisma.submission.findMany({
      where: { opportunityId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByWorkspaceId(workspaceId: string) {
    return this.prisma.submission.findMany({
      where: {
        opportunity: {
          workspaceId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, data: Prisma.SubmissionUpdateInput) {
    return this.prisma.submission.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.submission.delete({
      where: { id },
    });
  }

  async getStats() {
    const [total, byStatus] = await Promise.all([
      this.prisma.submission.count(),
      this.prisma.submission.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    const statusMap = {
      DRAFT: 0,
      SUBMITTED: 0,
      UNDER_REVIEW: 0,
      APPROVED: 0,
      REJECTED: 0,
    };

    byStatus.forEach((item) => {
      statusMap[item.status] = item._count;
    });

    return {
      total,
      byStatus: statusMap,
    };
  }
}