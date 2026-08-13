import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './modules/ai/ai.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HealthModule } from './modules/health/health.module';
import { MatchModule } from './modules/match/match.module';
import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SearchModule } from './modules/search/search.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    AuthModule,
    DashboardModule,
    HealthModule,
    MatchModule,
    OpportunitiesModule,
    OpportunityModule,
    ProfileModule,
    SearchModule,
    SubmissionsModule,
    WorkspaceModule,
  ],
})
export class AppModule {}
