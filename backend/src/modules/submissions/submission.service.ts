import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubmissionRepository } from './repositories/submission.repository';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { SubmissionStatus } from '@prisma/client';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly repository: SubmissionRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateSubmissionDto) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id: dto.opportunityId },
      select: { workspaceId: true },
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    const submissionData = {
      workspace: {
        connect: { id: opportunity.workspaceId },
      },
      status: SubmissionStatus.DRAFT,
      user: {
        connect: { id: dto.userId },
      },
      opportunity: {
        connect: { id: dto.opportunityId },
      },
    };

    return this.repository.create(submissionData);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async findByUserId(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async findByOpportunityId(opportunityId: string) {
    return this.repository.findByOpportunityId(opportunityId);
  }

  async findByWorkspaceId(workspaceId: string) {
    return this.repository.findByWorkspaceId(workspaceId);
  }

  async update(id: string, dto: UpdateSubmissionDto) {
    return this.repository.update(id, dto);
  }

  async updateStatus(id: string, status: SubmissionStatus) {
    return this.repository.update(id, { status });
  }

  async submit(id: string) {
    return this.repository.update(id, {
      status: SubmissionStatus.SUBMITTED,
      submittedAt: new Date(),
    });
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async getStats() {
    return this.repository.getStats();
  }
}