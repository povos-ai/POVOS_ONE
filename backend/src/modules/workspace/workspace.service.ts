import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workspace.findMany();
  }

  async create(data: any, userId: string) {
    return this.prisma.workspace.create({
      data: {
        name: data.name,
        slug: data.slug,
        createdBy: userId,
      },
    });
  }
}