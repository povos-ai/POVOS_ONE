import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ApplyJobDto } from './dto/apply-job.dto';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  // ===== RESUME MANAGEMENT =====

  async createResume(userId: string, dto: CreateResumeDto) {
    return this.prisma.resume.create({
      data: {
        userId,
        workspaceId: dto.workspaceId,
        fileName: dto.fileName,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize || 0,
        parsedText: dto.parsedText,
        skills: dto.skills || [],
        experience: dto.experience || [],
        education: dto.education || [],
      },
    });
  }

  async getResumes(userId: string) {
    return this.prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getResumeById(id: string, userId: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }

    if (resume.userId !== userId) {
      throw new NotFoundException('You do not have access to this resume');
    }

    return resume;
  }

  async deleteResume(id: string, userId: string) {
    await this.getResumeById(id, userId);
    await this.prisma.resume.delete({ where: { id } });
    return { message: 'Resume deleted successfully' };
  }

  // ===== JOB APPLICATION =====

  async applyToJob(userId: string, dto: ApplyJobDto) {
    const job = await this.prisma.opportunity.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${dto.jobId} not found`);
    }

    const existing = await this.prisma.jobApplication.findFirst({
      where: {
        jobId: dto.jobId,
        userId,
      },
    });

    if (existing) {
      throw new Error('You have already applied to this job');
    }

    const resume = await this.prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    let matchScore = 50;

    if (resume) {
      // ✅ Fix: Safely access skills with type checking
      const metadata = job.metadata as any || {};
      const jobSkills = metadata.skills || [];
      const resumeSkills = resume.skills as any || [];

      if (Array.isArray(jobSkills) && Array.isArray(resumeSkills) && jobSkills.length > 0 && resumeSkills.length > 0) {
        const matched = resumeSkills.filter((s: string) => jobSkills.includes(s));
        matchScore = Math.round((matched.length / jobSkills.length) * 100);
      }
    }

    return this.prisma.jobApplication.create({
      data: {
        jobId: dto.jobId,
        userId,
        workspaceId: dto.workspaceId,
        status: ApplicationStatus.PENDING,
        matchScore,
        coverLetter: dto.coverLetter,
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async getApplications(userId: string) {
    return this.prisma.jobApplication.findMany({
      where: { userId },
      orderBy: { appliedAt: 'desc' },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            type: true,
          },
        },
      },
    });
  }

  async getApplicationById(id: string, userId: string) {
    const application = await this.prisma.jobApplication.findUnique({
      where: { id },
      include: {
        job: true,
      },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    if (application.userId !== userId) {
      throw new NotFoundException('You do not have access to this application');
    }

    return application;
  }

  async updateApplicationStatus(id: string, userId: string, status: ApplicationStatus) {
    const application = await this.getApplicationById(id, userId);
    return this.prisma.jobApplication.update({
      where: { id },
      data: { status },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  async withdrawApplication(id: string, userId: string) {
    return this.updateApplicationStatus(id, userId, ApplicationStatus.WITHDRAWN);
  }

  // ===== JOB MATCHING =====

  async getJobMatches(userId: string) {
    const resume = await this.prisma.resume.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!resume) {
      return { message: 'Please upload a resume first' };
    }

    const jobs = await this.prisma.opportunity.findMany({
      where: {
        type: 'JOB',
        status: 'PUBLISHED',
      },
    });

    const matches = jobs.map((job) => {
      let score = 50;

      // ✅ Fix: Safely access skills with type checking
      const metadata = job.metadata as any || {};
      const jobSkills = metadata.skills || [];
      const resumeSkills = resume.skills as any || [];

      if (Array.isArray(jobSkills) && Array.isArray(resumeSkills) && jobSkills.length > 0 && resumeSkills.length > 0) {
        const matched = resumeSkills.filter((s: string) => jobSkills.includes(s));
        score = Math.round((matched.length / jobSkills.length) * 100);
      }

      return {
        job,
        matchScore: score,
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    return matches;
  }
}