import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // Count all opportunities (no status filter)
    const schemeCount = await this.prisma.opportunity.count();
    const userCount = await this.prisma.user.count();
    const workspaceCount = await this.prisma.workspace.count();

    // Recent 5 opportunities
    const recentOpportunities = await this.prisma.opportunity.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        createdAt: true,
      },
    });

    return {
      governmentSchemes: {
        count: schemeCount,
        growth: 8, // will calculate later
      },
      activeUsers: {
        count: userCount,
        growth: 18,
      },
      totalApplications: workspaceCount,
      recentActivity: recentOpportunities.map((item) => ({
        title: item.title,
        daysAgo: Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
        views: 0,
      })),
    };
  }
}
