import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OpportunityService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.opportunity.findMany();
  }

  async create(data: any, userId: string) {
    // For now, use a default workspace or handle properly
    return this.prisma.opportunity.create({
      data: {
        ...data,
        workspaceId: 'cmsdgfc64000tk5rdtw8l09t9', // Default workspace
      },
    });
  }
}
