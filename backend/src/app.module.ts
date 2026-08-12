import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ProfileModule } from './modules/profile/profile.module';
import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AiModule } from './modules/ai/ai.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DashboardModule,
    OpportunitiesModule,
    AiModule,
  ],
})
export class AppModule {}

