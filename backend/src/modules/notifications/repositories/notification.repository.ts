import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.notification.create({ data });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.NotificationWhereInput;
  }): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      ...params,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUserId(
    userId: string,
    params?: { skip?: number; take?: number }
  ): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: params?.skip,
      take: params?.take,
      include: { user: true },
    });
  }

  async update(
    id: string,
    data: Prisma.NotificationUpdateInput
  ): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    const result = await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return { count: result.count };
  }

  async delete(id: string): Promise<Notification> {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async countUnread(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { userId, read: false },
    });
  }
}