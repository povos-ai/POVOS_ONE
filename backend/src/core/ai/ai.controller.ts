import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { OpenAIService } from './openai.service';
import { HuggingFaceService } from './hf.service';

@Controller('ai')
@ApiTags('AI')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly openaiService: OpenAIService,
    private readonly hfService: HuggingFaceService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'AI Service Health Check' })
  health() {
    return {
      gemini: this.aiService.health(),
      openai: this.openaiService.health(),
      huggingface: this.hfService.health(),
    };
  }

  // ===== OPENAI ENDPOINTS =====

  @Post('openai/generate')
  @ApiOperation({ summary: 'Generate text using OpenAI' })
  async openaiGenerate(@Body() body: any) {
    return this.openaiService.generateText(body.prompt);
  }

  @Post('openai/opportunity')
  @ApiOperation({ summary: 'Generate opportunity using OpenAI' })
  async openaiOpportunity(@Body() body: any) {
    return this.openaiService.generateOpportunity(body.topic);
  }

  // ===== HUGGING FACE ENDPOINTS =====

  @Post('hf/generate')
  @ApiOperation({ summary: 'Generate text using Hugging Face' })
  async hfGenerate(@Body() body: any) {
    return this.hfService.generateText(body.prompt);
  }

  @Post('hf/opportunity')
  @ApiOperation({ summary: 'Generate opportunity using Hugging Face' })
  async hfOpportunity(@Body() body: any) {
    return this.hfService.generateOpportunity(body.topic);
  }

  // ===== GEMINI ENDPOINTS =====

  @Post('generate')
  @ApiOperation({ summary: 'Generate text using Gemini' })
  async generate(@Body() body: any) {
    return this.aiService.generateText(body.prompt);
  }

  @Post('opportunity')
  @ApiOperation({ summary: 'Generate opportunity using Gemini' })
  async generateOpportunity(@Body() body: any) {
    return this.aiService.generateOpportunity(body.topic);
  }
}