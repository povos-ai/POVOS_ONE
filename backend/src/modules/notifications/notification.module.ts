import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './services/notification.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { NotificationRepository } from './repositories/notification.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    EmailService,
    SmsService,
    NotificationRepository,
  ],
  exports: [NotificationService, EmailService, SmsService],
})
export class NotificationModule {}