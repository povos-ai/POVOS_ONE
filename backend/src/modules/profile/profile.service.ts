import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        age: true,
        education: true,
        state: true,
        category: true,
        businessType: true,
        income: true,
        gender: true,
        district: true,
        city: true,
        qualification: true,
        fieldOfStudy: true,
        skills: true,
        experienceYears: true,
        certifications: true,
        userType: true,
        employmentStatus: true,
        industry: true,
        sector: true,
        businessName: true,
        businessSector: true,
        businessStage: true,
        registrationStatus: true,
        turnoverRange: true,
        employeeCount: true,
        interests: true,
        preferredTypes: true,
        geoPreference: true,
        // password is deliberately excluded
      },
    });
  }

  async updateProfile(userId: string, data: any) {
    // Only allow specific fields to be updated
    const allowedFields = [
      'firstName',
      'lastName',
      'email',
      'age',
      'education',
      'state',
      'category',
      'businessType',
      'income',
      'gender',
      'district',
      'city',
      'qualification',
      'fieldOfStudy',
      'skills',
      'experienceYears',
      'certifications',
      'userType',
      'employmentStatus',
      'industry',
      'sector',
      'businessName',
      'businessSector',
      'businessStage',
      'registrationStatus',
      'turnoverRange',
      'employeeCount',
      'interests',
      'preferredTypes',
      'geoPreference',
    ];

    // Filter the data to only include allowed fields
    const filteredData: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    }

    // Update the user
    await this.prisma.user.update({
      where: { id: userId },
      data: filteredData,
    });

    // Return the updated profile WITHOUT password using getProfile
    return this.getProfile(userId);
  }

  calculateCompletion(profile: any): number {
    let score = 0;
    if (profile.age) score += 10;
    if (profile.gender && profile.gender !== 'Prefer not to say') score += 5;
    if (profile.state) score += 10;
    if (profile.education) score += 15;
    if (profile.userType) score += 15;
    // Safely parse interests
    let interests: any[] = [];
    try {
      interests = profile.interests ? JSON.parse(profile.interests) : [];
    } catch {
      interests = [];
    }
    if (interests.length > 0) score += 15;
    // Safely parse preferredTypes
    let preferredTypes: any[] = [];
    try {
      preferredTypes = profile.preferredTypes ? JSON.parse(profile.preferredTypes) : [];
    } catch {
      preferredTypes = [];
    }
    if (preferredTypes.length > 0) score += 10;
    if (profile.geoPreference) score += 10;
    if (profile.userType === 'Entrepreneur') {
      if (profile.businessType) score += 5;
      if (profile.businessStage) score += 5;
    }
    return Math.min(100, Math.round(score));
  }
}
