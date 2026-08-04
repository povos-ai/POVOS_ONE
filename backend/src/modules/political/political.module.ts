import { Module } from '@nestjs/common';
import { PoliticalController } from './political.controller';
import { PoliticalService } from './political.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PoliticalController],
  providers: [PoliticalService],
  exports: [PoliticalService],
})
export class PoliticalModule {}