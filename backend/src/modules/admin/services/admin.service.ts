import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AdminStatsDto } from '../dto/admin-stats.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== DASHBOARD STATS =====

  async getStats(): Promise<AdminStatsDto> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));

    const [
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      totalWorkspaces,
      activeWorkspaces,
      totalOpportunities,
      publishedOpportunities,
      draftOpportunities,
      newOpportunitiesThisMonth,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      rejectedApplications,
      totalSubmissions,
      submissionsToday,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prisma.workspace.count(),
      this.prisma.workspace.count({ where: { isActive: true } }),
      this.prisma.opportunity.count(),
      this.prisma.opportunity.count({ where: { published: true } }),
      this.prisma.opportunity.count({ where: { status: 'DRAFT' } }),
      this.prisma.opportunity.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      this.prisma.smartApplication.count(),
      this.prisma.smartApplication.count({
        where: { status: 'PENDING' as any },
      }),
      this.prisma.smartApplication.count({
        where: { status: 'SHORTLISTED' as any },
      }),
      this.prisma.smartApplication.count({
        where: { status: 'REJECTED' as any },
      }),
      this.prisma.submission.count(),
      this.prisma.submission.count({
        where: { createdAt: { gte: startOfDay } },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        newThisMonth: newUsersThisMonth,
      },
      workspaces: {
        total: totalWorkspaces,
        active: activeWorkspaces,
      },
      opportunities: {
        total: totalOpportunities,
        published: publishedOpportunities,
        draft: draftOpportunities,
        newThisMonth: newOpportunitiesThisMonth,
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        approved: shortlistedApplications,
        rejected: rejectedApplications,
      },
      submissions: {
        total: totalSubmissions,
        today: submissionsToday,
      },
    };
  }

  // ===== USER MANAGEMENT =====

  async getUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          memberships: {
            include: {
              workspace: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            workspace: true,
            role: true,
          },
        },
        resumes: true,
        smartApplications: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    await this.getUserById(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        isActive: dto.isActive,
      },
    });
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  // ===== WORKSPACE MANAGEMENT =====

  async getWorkspaces(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [workspaces, total] = await Promise.all([
      this.prisma.workspace.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          memberships: {
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
              role: true,
            },
          },
        },
      }),
      this.prisma.workspace.count(),
    ]);

    return {
      workspaces,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getWorkspaceById(id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            role: true,
          },
        },
        opportunities: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }

    return workspace;
  }

  async deleteWorkspace(id: string) {
    await this.getWorkspaceById(id);
    await this.prisma.workspace.delete({ where: { id } });
    return { message: 'Workspace deleted successfully' };
  }

  // ===== OPPORTUNITY MANAGEMENT =====

  async getOpportunities(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [opportunities, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          workspace: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          submissions: true,
        },
      }),
      this.prisma.opportunity.count(),
    ]);

    return {
      opportunities,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getOpportunityById(id: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        submissions: {
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
        },
      },
    });

    if (!opportunity) {
      throw new NotFoundException(`Opportunity with ID ${id} not found`);
    }

    return opportunity;
  }

  async updateOpportunity(id: string, dto: UpdateOpportunityDto) {
    await this.getOpportunityById(id);

    return this.prisma.opportunity.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status as any,
        published: dto.published,
      },
    });
  }

  async deleteOpportunity(id: string) {
    await this.getOpportunityById(id);
    await this.prisma.opportunity.delete({ where: { id } });
    return { message: 'Opportunity deleted successfully' };
  }

  // ===== APPLICATION MANAGEMENT =====

  async getApplications(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      this.prisma.smartApplication.findMany({
        skip,
        take: limit,
        orderBy: { appliedAt: 'desc' },
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
          template: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.smartApplication.count(),
    ]);

    return {
      applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getApplicationById(id: string) {
    const application = await this.prisma.smartApplication.findUnique({
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
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async updateApplicationStatus(id: string, status: string) {
    const application = await this.getApplicationById(id);

    return this.prisma.smartApplication.update({
      where: { id },
      data: { status: status as any },
      include: {
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

  async deleteApplication(id: string) {
    await this.getApplicationById(id);
    await this.prisma.smartApplication.delete({ where: { id } });
    return { message: 'Application deleted successfully' };
  }

  // ===== RECENT ACTIVITY =====

  async getRecentActivity(limit: number = 10) {
    const [users, opportunities, applications] = await Promise.all([
      this.prisma.user.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      }),
      this.prisma.opportunity.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          workspace: {
            select: { name: true },
          },
        },
      }),
      this.prisma.smartApplication.findMany({
        take: limit,
        orderBy: { appliedAt: 'desc' },
        select: {
          id: true,
          status: true,
          appliedAt: true,
          user: {
            select: { firstName: true, lastName: true, email: true },
          },
          opportunity: {
            select: { title: true },
          },
        },
      }),
    ]);

    return {
      users: users.map((u) => ({
        ...u,
        type: 'user_registered',
        timestamp: u.createdAt,
      })),
      opportunities: opportunities.map((o) => ({
        ...o,
        type: 'opportunity_created',
        timestamp: o.createdAt,
      })),
      applications: applications.map((a) => ({
        ...a,
        type: 'application_submitted',
        timestamp: a.appliedAt,
      })),
    };
  }
}