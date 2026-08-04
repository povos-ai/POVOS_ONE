import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private configService: ConfigService) {}

  async sendSMS(params: { to: string; message: string }): Promise<{ success: boolean }> {
    this.logger.log(`📱 SMS would be sent to: ${params.to}`);
    this.logger.log(`📱 Message: ${params.message}`);
    return { success: true };
  }

  async sendSubmissionConfirmation(params: {
    to: string;
    name: string;
    opportunityTitle: string;
  }): Promise<{ success: boolean }> {
    const message = `Hi ${params.name}, your application for "${params.opportunityTitle}" submitted. - POVOS ONE`;
    return this.sendSMS({ to: params.to, message });
  }

  async sendStatusUpdate(params: {
    to: string;
    name: string;
    opportunityTitle: string;
    status: string;
  }): Promise<{ success: boolean }> {
    const message = `Hi ${params.name}, your application "${params.opportunityTitle}" status: ${params.status}. - POVOS ONE`;
    return this.sendSMS({ to: params.to, message });
  }
}