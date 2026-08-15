import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OpportunityService {
  constructor(private prisma: PrismaService) {}

  private async resolveWorkspaceId(userId: string): Promise<string> {
    console.log('🔍 [Service] resolveWorkspaceId called with userId:', userId);
    
    const userWorkspaces = await this.prisma.workspace.findMany({
      where: { userId },
      select: { id: true },
    });

    console.log('📊 [Service] Found workspaces:', userWorkspaces.length);

    if (userWorkspaces.length === 0) {
      console.log('❌ [Service] No workspaces found');
      throw new ForbiddenException('User has no workspaces. Please create a workspace first.');
    }

    console.log('✅ [Service] Using workspace:', userWorkspaces[0].id);
    return userWorkspaces[0].id;
  }

  async findAll(userId: string) {
    const workspaceId = await this.resolveWorkspaceId(userId);
    return this.prisma.opportunity.findMany({
      where: {
        workspaceId,
      },
    });
  }

  async findBySlug(slug: string, userId: string) {
    const workspaceId = await this.resolveWorkspaceId(userId);
    const opportunity = await this.prisma.opportunity.findFirst({
      where: {
        slug,
        workspaceId,
      },
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!opportunity) {
      throw new NotFoundException(`Opportunity with slug "${slug}" not found`);
    }

    return opportunity;
  }

  async create(data: any, userId: string) {
    console.log('🚀 [Service] CREATE METHOD CALLED');
    console.log('📦 [Service] userId:', userId);
    console.log('📦 [Service] data:', JSON.stringify(data, null, 2));
    
    const workspaceId = await this.resolveWorkspaceId(userId);
    console.log('📊 [Service] resolved workspaceId:', workspaceId);

    const createData = {
      ...data,
      providerId: userId,
      workspaceId: workspaceId,
    };
    console.log('📦 [Service] createData:', JSON.stringify(createData, null, 2));

    try {
      const result = await this.prisma.opportunity.create({
        data: createData,
      });
      console.log('✅ [Service] Opportunity created:', result.id);
      return result;
    } catch (error) {
      console.error('❌ [Service] Prisma error:', error);
      console.error('❌ [Service] Error message:', error.message);
      console.error('❌ [Service] Error stack:', error.stack);
      throw error;
    }
  }
}
