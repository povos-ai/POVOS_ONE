import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { PlannerStatus } from '@prisma/client';

@Injectable()
export class PlannerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePlannerDto) {
    return this.prisma.planner.create({
      data: {
        userId,
        workspaceId: dto.workspaceId,
        title: dto.title,
        description: dto.description,
        type: dto.type,
        priority: dto.priority || 'MEDIUM',
        status: dto.status || 'PENDING',
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        reminderAt: dto.reminderAt ? new Date(dto.reminderAt) : null,
        metadata: dto.metadata || {},
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async findAll(userId: string, workspaceId?: string) {
    const where: any = { userId };
    if (workspaceId) {
      where.workspaceId = workspaceId;
    }

    return this.prisma.planner.findMany({
      where,
      orderBy: { dueDate: 'asc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async findById(id: string, userId: string) {
    const item = await this.prisma.planner.findUnique({
      where: { id },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Planner item with ID ${id} not found`);
    }

    if (item.userId !== userId) {
      throw new NotFoundException('You do not have access to this item');
    }

    return item;
  }

  async update(id: string, userId: string, dto: UpdatePlannerDto) {
    await this.findById(id, userId);

    return this.prisma.planner.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        type: dto.type,
        priority: dto.priority,
        status: dto.status,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        reminderAt: dto.reminderAt ? new Date(dto.reminderAt) : undefined,
        metadata: dto.metadata,
      },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    await this.findById(id, userId);
    await this.prisma.planner.delete({ where: { id } });
    return { message: 'Planner item deleted successfully' };
  }

  async updateStatus(id: string, userId: string, status: PlannerStatus) {
    await this.findById(id, userId);
    return this.prisma.planner.update({
      where: { id },
      data: { status },
    });
  }

  async getUpcoming(userId: string, days: number = 7) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + days);

    return this.prisma.planner.findMany({
      where: {
        userId,
        dueDate: { lte: cutoff },
        status: { in: ['PENDING', 'IN_PROGRESS'] },
      },
      orderBy: { dueDate: 'asc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }

  async getOverdue(userId: string) {
    const now = new Date();

    return this.prisma.planner.findMany({
      where: {
        userId,
        dueDate: { lt: now },
        status: { in: ['PENDING', 'IN_PROGRESS'] },
      },
      orderBy: { dueDate: 'asc' },
      include: {
        workspace: {
          select: { id: true, name: true, slug: true },
        },
      },
    });
  }
}