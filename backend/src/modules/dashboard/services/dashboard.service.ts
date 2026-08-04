import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdminDashboard() {
    const [totalUsers, totalOpportunities, totalSubmissions, recentSubmissions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.opportunity.count(),
      this.prisma.submission.count(),
      this.prisma.submission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, email: true } },
          opportunity: { select: { title: true } },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalOpportunities,
        totalSubmissions,
        pendingSubmissions: await this.prisma.submission.count({
          where: { status: 'UNDER_REVIEW' },
        }),
      },
      recentSubmissions,
    };
  }

  async getWorkspaceDashboard(userId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: { userId },
      select: { workspaceId: true },
    });

    if (!membership?.workspaceId) {
      return { message: 'User is not associated with any workspace' };
    }

    const workspaceId = membership.workspaceId;

    const [opportunities, submissions, stats] = await Promise.all([
      this.prisma.opportunity.findMany({
        where: { workspaceId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          submissions: {
            select: { status: true },
          },
        },
      }),
      this.prisma.submission.findMany({
        where: {
          opportunity: { workspaceId },
        },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, email: true } },
          opportunity: { select: { title: true } },
        },
      }),
      {
        totalOpportunities: await this.prisma.opportunity.count({
          where: { workspaceId },
        }),
        totalSubmissions: await this.prisma.submission.count({
          where: { opportunity: { workspaceId } },
        }),
        publishedOpportunities: await this.prisma.opportunity.count({
          where: { workspaceId, published: true },
        }),
      },
    ]);

    return {
      workspaceId,
      stats,
      recentOpportunities: opportunities,
      recentSubmissions: submissions,
    };
  }

  async getApplicantDashboard(userId: string) {
    const [submissions, stats] = await Promise.all([
      this.prisma.submission.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          opportunity: {
            select: {
              title: true,
              workspace: { select: { name: true } },
            },
          },
        },
      }),
      {
        totalSubmissions: await this.prisma.submission.count({
          where: { userId },
        }),
        pendingReview: await this.prisma.submission.count({
          where: { userId, status: 'UNDER_REVIEW' },
        }),
        approved: await this.prisma.submission.count({
          where: { userId, status: 'APPROVED' },
        }),
        rejected: await this.prisma.submission.count({
          where: { userId, status: 'REJECTED' },
        }),
      },
    ]);

    return {
      stats,
      recentSubmissions: submissions,
    };
  }
}