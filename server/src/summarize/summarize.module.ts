import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummarizeService } from './summarize.service';
import { SummarizeController } from './summarize.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SummarizeService],
  controllers: [SummarizeController],
})
export class SummarizeModule {}
