import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { MatchRequestDto } from './dto/match-request.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Match')
@Controller('match')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('score')
  @ApiOperation({ summary: 'Calculate match score between user and entity' })
  calculateMatchScore(@Body() dto: MatchRequestDto) {
    return this.matchService.calculateMatchScore(dto);
  }

  @Get('user/:userId/entity/:entityId/:entityType')
  @ApiOperation({ summary: 'Get match score by IDs' })
  getMatchScore(
    @Param('userId') userId: string,
    @Param('entityId') entityId: string,
    @Param('entityType') entityType: string,
  ) {
    const dto: MatchRequestDto = {
      userId,
      entityId,
      entityType,
    };
    return this.matchService.calculateMatchScore(dto);
  }
}