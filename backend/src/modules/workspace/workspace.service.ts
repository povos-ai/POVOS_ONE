import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserWorkspaces(userId: string) {
    const memberships = await this.prisma.membership.findMany({
      where: { userId },
      include: {
        workspace: true,
        role: true,
      },
    });

    return memberships.map((m) => ({
      id: m.workspace.id,
      name: m.workspace.name,
      slug: m.workspace.slug,
      logo: m.workspace.logo,
      description: m.workspace.description,
      role: m.role.name,
      isActive: m.workspace.isActive,
    }));
  }
}