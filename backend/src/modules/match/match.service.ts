import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { AiService } from "../../core/ai/ai.service";
import { MatchRequestDto } from "./dto/match-request.dto";
import { MatchResponseDto } from "./dto/match-response.dto";

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async calculateMatchScore(dto: MatchRequestDto): Promise<MatchResponseDto> {
    const user = await this.getUserProfile(dto.userId);
    const entity = await this.getEntity(dto.entityId, dto.entityType);

    const skillScore = this.calculateSkillScore(
      dto.userSkills || user?.skills || [],
      dto.entitySkills || entity?.skills || [],
    );

    const experienceScore = this.calculateExperienceScore(
      dto.userExperience || user?.experience || 0,
      dto.requiredExperience || entity?.requiredExperience || 0,
    );

    const locationScore = this.calculateLocationScore(
      dto.userLocation || user?.location || "",
      dto.entityLocation || entity?.location || "",
    );

    const educationScore = this.calculateEducationScore(
      dto.userEducation || user?.education || [],
      dto.requiredEducation || entity?.requiredEducation || [],
    );

    const weights = {
      skills: 0.4,
      experience: 0.3,
      location: 0.2,
      education: 0.1,
    };

    const overallScore = Math.round(
      skillScore * weights.skills +
      experienceScore * weights.experience +
      locationScore * weights.location +
      educationScore * weights.education,
    );

    const summary = await this.generateSummary(
      overallScore,
      skillScore,
      experienceScore,
      locationScore,
      educationScore,
      dto.entityType,
    );

    return {
      score: overallScore,
      breakdown: {
        skills: Math.round(skillScore),
        experience: Math.round(experienceScore),
        location: Math.round(locationScore),
        education: Math.round(educationScore),
      },
      recommendations: this.generateRecommendations(
        skillScore,
        experienceScore,
        locationScore,
        educationScore,
      ),
      matchedSkills: this.findMatchedSkills(
        dto.userSkills || user?.skills || [],
        dto.entitySkills || entity?.skills || [],
      ),
      missingSkills: this.findMissingSkills(
        dto.userSkills || user?.skills || [],
        dto.entitySkills || entity?.skills || [],
      ),
      summary,
    };
  }

  private calculateSkillScore(userSkills: string[], entitySkills: string[]): number {
    if (!userSkills.length || !entitySkills.length) {
      return 0;
    }

    const matched = userSkills.filter((skill) =>
      entitySkills.some((entitySkill) =>
        entitySkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(entitySkill.toLowerCase())
      )
    );

    return (matched.length / Math.max(entitySkills.length, 1)) * 100;
  }

  private calculateExperienceScore(userExp: number, requiredExp: number): number {
    if (!requiredExp) {
      return 100;
    }
    if (!userExp) {
      return 0;
    }
    return Math.min((userExp / requiredExp) * 100, 100);
  }

  private calculateLocationScore(userLocation: string, entityLocation: string): number {
    if (!userLocation || !entityLocation) {
      return 50;
    }

    const userWords = userLocation.toLowerCase().split(/[\s,]+/);
    const entityWords = entityLocation.toLowerCase().split(/[\s,]+/);

    const matched = userWords.filter((word) =>
      entityWords.some((entityWord) => entityWord.includes(word) || word.includes(entityWord))
    );

    const score = (matched.length / Math.max(userWords.length, entityWords.length)) * 100;
    return Math.min(score, 100);
  }

  private calculateEducationScore(userEdu: string[], requiredEdu: string[]): number {
    if (!requiredEdu.length) {
      return 100;
    }
    if (!userEdu.length) {
      return 0;
    }

    const matched = userEdu.filter((edu) =>
      requiredEdu.some((req) => req.toLowerCase().includes(edu.toLowerCase()))
    );

    return (matched.length / Math.max(requiredEdu.length, 1)) * 100;
  }

  private findMatchedSkills(userSkills: string[], entitySkills: string[]): string[] {
    return userSkills.filter((skill) =>
      entitySkills.some((entitySkill) =>
        entitySkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(entitySkill.toLowerCase())
      )
    );
  }

  private findMissingSkills(userSkills: string[], entitySkills: string[]): string[] {
    return entitySkills.filter((entitySkill) =>
      !userSkills.some((skill) =>
        entitySkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(entitySkill.toLowerCase())
      )
    );
  }

  private generateRecommendations(
    skillScore: number,
    experienceScore: number,
    locationScore: number,
    educationScore: number,
  ): string[] {
    const recommendations: string[] = [];

    if (skillScore < 60) {
      recommendations.push("Improve your skills: Learn the required technologies");
    }
    if (experienceScore < 60) {
      recommendations.push("Gain more experience: Consider internships or projects");
    }
    if (locationScore < 60) {
      recommendations.push("Consider relocation or remote opportunities");
    }
    if (educationScore < 60) {
      recommendations.push("Upgrade your education: Take relevant courses");
    }

    if (recommendations.length === 0) {
      recommendations.push("Great match! You are well aligned with this opportunity");
    }

    return recommendations;
  }

  private async generateSummary(
    overallScore: number,
    skillScore: number,
    experienceScore: number,
    locationScore: number,
    educationScore: number,
    entityType: string,
  ): Promise<string> {
    try {
      const prompt = "Generate a 2-3 sentence summary for a " + entityType + " match:\n" +
        "- Overall Match: " + overallScore + "%\n" +
        "- Skills Match: " + Math.round(skillScore) + "%\n" +
        "- Experience Match: " + Math.round(experienceScore) + "%\n" +
        "- Location Match: " + Math.round(locationScore) + "%\n" +
        "- Education Match: " + Math.round(educationScore) + "%\n\n" +
        "Summary:";

      const response = await this.aiService.generateText(prompt);
      return response || "You are " + overallScore + "% match for this " + entityType + ".";
    } catch (error) {
      this.logger.error("AI summary failed: " + error.message);
      return "You are " + overallScore + "% match for this " + entityType + ".";
    }
  }

  private async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        resumes: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        memberships: {
          include: {
            workspace: true,
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User with ID " + userId + " not found");
    }

    const resume = user.resumes[0];

    return {
      skills: (resume?.skills as string[]) || [],
      experience: 5,
      location: user.phone || "",
      education: (resume?.education as string[]) || [],
    };
  }

  private async getEntity(entityId: string, entityType: string) {
    let entity: any = null;

    switch (entityType) {
      case "job":
        entity = await this.prisma.opportunity.findUnique({
          where: { id: entityId },
        });
        break;
      case "business":
        entity = await this.prisma.business.findUnique({
          where: { id: entityId },
        });
        break;
      case "campaign":
        entity = await this.prisma.campaign.findUnique({
          where: { id: entityId },
        });
        break;
      default:
        throw new Error("Unsupported entity type: " + entityType);
    }

    if (!entity) {
      throw new NotFoundException(entityType + " with ID " + entityId + " not found");
    }

    return {
      skills: entity.metadata?.skills || [],
      requiredExperience: entity.metadata?.experience || 0,
      location: entity.location || "",
      requiredEducation: entity.metadata?.education || [],
    };
  }
}
