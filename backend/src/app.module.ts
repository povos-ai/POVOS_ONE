import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { SubmissionModule } from './modules/submissions/submission.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { SearchModule } from './modules/search/search.module';
import { PlannerModule } from './modules/planner/planner.module';
import { JobModule } from './modules/job/job.module';
import { BusinessModule } from './modules/business/business.module';
import { PoliticalModule } from './modules/political/political.module';
import { MatchModule } from './modules/match/match.module';
import { SmartApplyModule } from './modules/smart-apply/smart-apply.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    LoggerModule,
    CoreModule,
    AuthModule,
    WorkspaceModule,
    OpportunityModule,
    SubmissionModule,
    NotificationModule,
    DashboardModule,
    SearchModule,
    PlannerModule,
    JobModule,
    BusinessModule,
    PoliticalModule,
    MatchModule,
    SmartApplyModule,
    AdminModule,
  ],
})
export class AppModule {}