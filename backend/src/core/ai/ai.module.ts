import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { OpenAIService } from './openai.service';
import { HuggingFaceService } from './hf.service';
import { AiController } from './ai.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,          // Gemini
    OpenAIService,      // ✅ OpenAI
    HuggingFaceService, // ✅ Hugging Face
  ],
  exports: [AiService, OpenAIService, HuggingFaceService],
})
export class AiModule {}