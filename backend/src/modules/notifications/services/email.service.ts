import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {}

  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<{ success: boolean }> {
    this.logger.log(`📧 Email would be sent to: ${params.to}`);
    this.logger.log(`📧 Subject: ${params.subject}`);
    // Simulate email sending
    return { success: true };
  }

  async sendSubmissionConfirmation(params: {
    to: string;
    name: string;
    opportunityTitle: string;
    submissionId: string;
  }): Promise<{ success: boolean }> {
    const html = `
      <h1>Application Submitted!</h1>
      <p>Dear ${params.name},</p>
      <p>Your application for <strong>${params.opportunityTitle}</strong> has been submitted.</p>
      <p>Submission ID: ${params.submissionId}</p>
    `;
    return this.sendEmail({
      to: params.to,
      subject: `Application Submitted: ${params.opportunityTitle}`,
      html,
    });
  }

  async sendStatusUpdate(params: {
    to: string;
    name: string;
    opportunityTitle: string;
    status: string;
  }): Promise<{ success: boolean }> {
    const html = `
      <h1>Status Update</h1>
      <p>Dear ${params.name},</p>
      <p>Your application for <strong>${params.opportunityTitle}</strong> status: ${params.status}</p>
    `;
    return this.sendEmail({
      to: params.to,
      subject: `Status Update: ${params.opportunityTitle}`,
      html,
    });
  }

  async sendWelcomeEmail(params: { to: string; name: string }): Promise<{ success: boolean }> {
    const html = `
      <h1>Welcome to POVOS ONE!</h1>
      <p>Dear ${params.name},</p>
      <p>Thank you for joining POVOS ONE.</p>
    `;
    return this.sendEmail({
      to: params.to,
      subject: 'Welcome to POVOS ONE!',
      html,
    });
  }
}