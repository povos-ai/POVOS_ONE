import { Injectable, Logger } from '@nestjs/common';
import { AiService } from '../../ai/ai.service';
import { PrismaService } from '../../../database/prisma.service';
import { RecommendationRequestDto } from '../dto/recommendation-request.dto';

@Injectable()
export class RecommendationService {
  private readonly logger = new Logger(RecommendationService.name);

  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  async recommend(request: RecommendationRequestDto): Promise<string[]> {
    const { userProfile, items, promptInstructions, limit = 10 } = request;

    this.logger.log(`🔍 Generating recommendations for user: ${JSON.stringify(userProfile)}`);

    if (!items || items.length === 0) {
      this.logger.warn('No items provided for recommendation');
      return [];
    }

    if (items.length === 1) {
      return [items[0].id];
    }

    try {
      const prompt = this.buildEnhancedRecommendationPrompt(
        userProfile,
        items,
        limit,
        promptInstructions,
      );

      const aiResponse = await this.aiService.generateText(prompt);
      const recommendedIds = this.parseAIResponse(aiResponse, items);

      this.logger.log(`✅ Successfully generated ${recommendedIds.length} recommendations`);

      return recommendedIds.slice(0, limit);
    } catch (error) {
      this.logger.error(`❌ Recommendation failed: ${error.message}`);
      return items.slice(0, limit).map((item) => item.id);
    }
  }

  async getContextRecommendations(userId: string, workspaceId: string, limit: number = 10) {
    this.logger.log(`🔍 Getting context recommendations for user ${userId} in workspace ${workspaceId}`);

    const recentActivity = await this.prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        opportunity: true,
      },
    });

    const userPreferences = await this.getUserPreferences(userId);

    const opportunities = await this.prisma.opportunity.findMany({
      where: {
        workspaceId,
        status: 'PUBLISHED',
      },
      take: 30,
    });

    const items = opportunities.map((opp) => ({
      id: opp.id,
      title: opp.title,
      description: opp.description || '',
      category: opp.category,
      level: opp.level,
      state: opp.state || '',
      type: opp.type,
    }));

    // ✅ Fix: Handle null userPreferences
    const userProfile = {
      state: userPreferences?.state || '',
      district: userPreferences?.district || '',
      metadata: {
        recentCategories: this.getRecentCategories(recentActivity),
        appliedOpportunities: recentActivity.map((s) => s.opportunityId),
        preferences: userPreferences || {},
      },
    };

    const promptInstructions = `
Context:
- Workspace: ${workspaceId}
- Recent Activity: ${JSON.stringify(recentActivity)}
- User Preferences: ${JSON.stringify(userPreferences || {})}
- Current Context: ${this.getContextualInfo(userId, workspaceId)}

Focus on:
1. Opportunities similar to user's previous applications
2. Opportunities in user's preferred categories
3. Opportunities with high relevance score
`;

    return this.recommend({
      userProfile,
      items,
      promptInstructions,
      limit,
    });
  }

  private async getUserPreferences(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // ✅ Remove state/district (they don't exist)
      },
    });
    return user || {};
  }

  private getRecentCategories(submissions: any[]): string[] {
    const categories = submissions.map((s) => s.opportunity?.category).filter(Boolean);
    return [...new Set(categories)];
  }

  private getContextualInfo(userId: string, workspaceId: string): string {
    return `User ${userId} in workspace ${workspaceId} is looking for opportunities.`;
  }

  private buildEnhancedRecommendationPrompt(
    userProfile: any,
    items: any[],
    limit: number,
    instructions?: string,
  ): string {
    const userInfo = `
User Profile:
- State: ${userProfile?.state || 'Not specified'}
- District: ${userProfile?.district || 'Not specified'}
- Role: ${userProfile?.role || 'Not specified'}
- Additional Info: ${JSON.stringify(userProfile?.metadata || {})}
`;

    const itemsInfo = items
      .map(
        (item, index) => `
Item ${index + 1}:
ID: ${item.id}
Title: ${item.title}
Description: ${item.description || 'No description'}
Category: ${item.category || 'Not specified'}
Level: ${item.level || 'Not specified'}
State: ${item.state || 'Not specified'}
Type: ${item.type || 'Not specified'}
`,
      )
      .join('\n');

    let prompt = `
You are an intelligent recommendation system for POVOS ONE - an AI-powered opportunity intelligence platform.

${userInfo}

I need you to recommend the top ${limit} items from the following list that best match this user's profile.

Items:
${itemsInfo}

${instructions || ''}

IMPORTANT: Return ONLY the IDs of the recommended items in a comma-separated list, in order of relevance.
Example format: "id1, id2, id3"

Do NOT include any other text, explanation, or formatting. Just return the IDs.
`;

    return prompt;
  }

  private parseAIResponse(response: string, items: any[]): string[] {
    try {
      let cleanResponse = response.replace(/```/g, '').trim();

      const idPattern = /[a-z0-9]{20,}/gi;
      const matches = cleanResponse.match(idPattern);

      if (!matches || matches.length === 0) {
        const ids = cleanResponse
          .split(/[\s,]+/)
          .map((id) => id.trim())
          .filter((id) => id.length > 5);

        if (ids.length > 0) {
          return ids;
        }
      }

      const validIds = new Set(items.map((item) => item.id));
      const recommendedIds = (matches || []).filter((id) => validIds.has(id));

      return recommendedIds;
    } catch (error) {
      this.logger.error(`Failed to parse AI response: ${error.message}`);
      return items.slice(0, 5).map((item) => item.id);
    }
  }
}