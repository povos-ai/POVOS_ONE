import { Injectable, ForbiddenException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto, UpdateStatusDto } from './dto';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateSubmissionDto) {
    const existing = await this.prisma.submission.findFirst({
      where: { userId, opportunityId: dto.opportunityId },
    });
    if (existing) {
      throw new ConflictException('You have already applied to this opportunity.');
    }
    return this.prisma.submission.create({
      data: {
        userId,
        opportunityId: dto.opportunityId,
        applicationData: dto.applicationData,
        status: 'DRAFT',
      },
      include: { opportunity: true },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.submission.findMany({
      where: { userId },
      include: { opportunity: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForUser(userId: string, submissionId: string) {
    const submission = await this.prisma.submission.findFirst({
      where: { id: submissionId, userId },
      include: { opportunity: true },
    });
    if (!submission) throw new ForbiddenException('Access denied');
    return submission;
  }

  async update(userId: string, submissionId: string, dto: UpdateSubmissionDto) {
    const submission = await this.findOneForUser(userId, submissionId);
    if (submission.status !== 'DRAFT') {
      throw new ForbiddenException('Cannot update a submitted application');
    }
    return this.prisma.submission.update({
      where: { id: submissionId },
      data: { applicationData: dto.applicationData },
    });
  }

  async submit(userId: string, submissionId: string) {
    const submission = await this.findOneForUser(userId, submissionId);
    if (submission.status !== 'DRAFT') {
      throw new ForbiddenException('Application is already submitted');
    }
    return this.prisma.submission.update({
      where: { id: submissionId },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
    });
  }

  // Admin
  async findAllForAdmin() {
    return this.prisma.submission.findMany({
      include: { user: true, opportunity: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForAdmin(submissionId: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: { user: true, opportunity: true },
    });
    if (!submission) throw new NotFoundException('Submission not found');
    return submission;
  }

  async updateStatus(submissionId: string, dto: UpdateStatusDto) {
    const allowedTransitions: Record<string, string[]> = {
      DRAFT: ['SUBMITTED'],
      SUBMITTED: ['UNDER_REVIEW', 'WITHDRAWN'],
      UNDER_REVIEW: ['DOCUMENT_REQUIRED', 'APPROVED', 'REJECTED'],
      DOCUMENT_REQUIRED: ['UNDER_REVIEW'],
      APPROVED: [],
      REJECTED: [],
      WITHDRAWN: [],
    };
    const current = await this.prisma.submission.findUnique({ where: { id: submissionId } });
    if (!current) throw new NotFoundException('Submission not found');
    if (!allowedTransitions[current.status ?? ""]?.includes(dto.status)) {
      throw new ForbiddenException(`Invalid status transition from ${current.status} to ${dto.status}`);
    }
    return this.prisma.submission.update({
      where: { id: submissionId },
      data: { status: dto.status, remarks: dto.remarks },
    });
  }
}




