import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './services/notification.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for current user' })
  async getuserNotifications(@Request() req: any, @Query('take') take?: string) {
    return this.notificationService.findByUserId(req.user.id, {
      take: take ? parseInt(take) : 10,
    });
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Get unread notification count' })
  async getUnreadCount(@Request() req: any) {
    const count = await this.notificationService.countUnread(req.user.id);
    return { unreadCount: count };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  async getNotification(@Param('id') id: string) {
    return this.notificationService.findById(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Patch('read/all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@Request() req: any) {
    return this.notificationService.markAllAsRead(req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async deleteNotification(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @Post('test/email')
  @ApiOperation({ summary: 'Test email notification' })
  async testEmail(@Request() req: any) {
    await this.notificationService.sendWelcomeNotification({
      userId: req.user.id,
      email: req.user.email,
      name: req.user.firstName || 'user',
    });
    return { message: 'Test email sent successfully' };
  }
}