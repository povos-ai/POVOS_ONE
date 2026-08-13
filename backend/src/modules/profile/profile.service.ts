import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  calculateCompletion(profile: any): number {
    let score = 0;
    if (profile.age) score += 10;
    if (profile.gender && profile.gender !== 'Prefer not to say') score += 5;
    if (profile.state) score += 10;
    if (profile.education) score += 15;
    if (profile.userType) score += 15;
    if (profile.interests && JSON.parse(profile.interests || '[]').length > 0) score += 15;
    if (profile.preferredTypes && JSON.parse(profile.preferredTypes || '[]').length > 0) score += 10;
    if (profile.geoPreference) score += 10;
    if (profile.userType === 'Entrepreneur') {
      if (profile.businessType) score += 5;
      if (profile.businessStage) score += 5;
    }
    return Math.min(100, Math.round(score));
  }
}
