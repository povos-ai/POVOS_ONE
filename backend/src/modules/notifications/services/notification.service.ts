import { Injectable, Logger } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification.repository';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly repository: NotificationRepository,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    metadata?: any;
  }): Promise<Notification> {
    return this.repository.create({
      user: {
        connect: { id: data.userId }
      },
      title: data.title,
      message: data.message,
      type: data.type || 'GENERAL',
      metadata: data.metadata || {},
      read: false,
    });
  }

  async findAll(params?: { skip?: number; take?: number }): Promise<Notification[]> {
    return this.repository.findAll(params);
  }

  async findByUserId(
    userId: string,
    params?: { skip?: number; take?: number }
  ): Promise<Notification[]> {
    return this.repository.findByUserId(userId, params);
  }

  async findById(id: string): Promise<Notification | null> {
    return this.repository.findById(id);
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.repository.markAsRead(id);
  }

  async markAllAsRead(userId: string): Promise<{ count: number }> {
    return this.repository.markAllAsRead(userId);
  }

  async delete(id: string): Promise<Notification> {
    return this.repository.delete(id);
  }

  async countUnread(userId: string): Promise<number> {
    return this.repository.countUnread(userId);
  }

  async sendWelcomeNotification(params: {
    userId: string;
    email: string;
    name: string;
  }): Promise<void> {
    await this.create({
      userId: params.userId,
      title: 'Welcome to POVOS ONE!',
      message: `Welcome ${params.name}! Start exploring opportunities today.`,
      type: 'WELCOME',
    });

    await this.emailService.sendWelcomeEmail({
      to: params.email,
      name: params.name,
    });

    this.logger.log(`✅ Welcome notification sent to: ${params.email}`);
  }
}