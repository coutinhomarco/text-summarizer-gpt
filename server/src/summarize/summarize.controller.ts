import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('summarize')
export class SummarizeController {
  constructor(private summarizeService: SummarizeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async summarize(@Req() req, @Body('text') text: string) {
    const userId = req.user.userId;
    return this.summarizeService.summarize(userId, text);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logs')
  async getLogs(@Req() req) {
    const userId = req.user.userId;
    return this.summarizeService.getLogs(userId);
  }
}
