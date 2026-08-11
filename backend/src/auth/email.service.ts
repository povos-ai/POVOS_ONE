import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT ?? "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, userId: string) {
    // Implementation for verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${userId}`;
    await this.transporter.sendMail({
      from: `"POVOS ONE" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verify your email',
      html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: `"POVOS ONE" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });
  }
}

