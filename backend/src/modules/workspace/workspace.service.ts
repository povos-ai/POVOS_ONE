import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.workspace.findMany({ where: { userId } });
  }

  async create(data: any, userId: string) {
    return this.prisma.workspace.create({
      data: {
        name: data.name,
        user: { connect: { id: userId } },
      },
    });
  }
}


