export class RecommendationRequestDto {
  userProfile: {
    state?: string;
    district?: string;
    role?: string;
    metadata?: Record<string, any>;
  };

  items: Array<{
    id: string;
    title: string;
    description?: string;
    category?: string;
    level?: string;
    state?: string;
    [key: string]: any;
  }>;

  promptInstructions?: string;
  limit?: number;
}