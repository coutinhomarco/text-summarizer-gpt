import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('summarize')
export class SummarizeController {
  constructor(private summarizeService: SummarizeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async summarize(@Req() req, @Body('text') text: string) {
    try {
      const userId = req.user.userId;
      const summary = await this.summarizeService.summarize(userId, text);
      return { message: 'Summarization successful', summary };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Summarization failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('logs')
  async getLogs(@Req() req) {
    try {
      const userId = req.user.userId;
      const logs = await this.summarizeService.getLogs(userId);
      return { message: 'Logs retrieved successfully', logs };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to retrieve logs',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
