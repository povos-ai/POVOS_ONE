import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OpportunitiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.opportunity.create({ data });
  }

  async findAll(query: any) {
    return this.prisma.opportunity.findMany();
  }

  async findOne(id: string) {
    const opportunity = await this.prisma.opportunity.findUnique({ where: { id } });
    if (!opportunity) throw new NotFoundException('Opportunity not found');
    return opportunity;
  }

  async update(id: string, data: any) {
    return this.prisma.opportunity.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.opportunity.delete({ where: { id } });
  }
}
