import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';

// Import core services (if any)
// import { AiService } from './ai/ai.service';
// import { RecommendationService } from './recommendation/recommendation.service';

@Global()
@Module({
  imports: [
    PrismaModule,      // ✅ Makes PrismaService available across the app
    LoggerModule,      // ✅ Structured logging
    ConfigModule,      // ✅ Environment variables
  ],
  providers: [
    // Add core services here if they are not in separate modules
    // AiService,
    // RecommendationService,
  ],
  exports: [
    PrismaModule,      // ✅ Export so other modules can use PrismaService
    LoggerModule,
    ConfigModule,
    // AiService,        // Export if needed elsewhere
  ],
})
export class CoreModule {}