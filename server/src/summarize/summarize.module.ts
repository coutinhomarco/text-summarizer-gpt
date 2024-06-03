import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { SummarizeRepository } from './summarize.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SummarizeService, SummarizeRepository, PrismaService],
  controllers: [SummarizeController],
})
export class SummarizeModule {}
