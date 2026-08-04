export class MatchBreakdownDto {
  skills: number;
  experience: number;
  location: number;
  education: number;
}

export class MatchResponseDto {
  score: number;
  breakdown: MatchBreakdownDto;
  recommendations: string[];
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
}