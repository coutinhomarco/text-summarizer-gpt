import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SummarizeService {
  private flaskServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.flaskServiceUrl = this.configService.get<string>('FLASK_SERVICE_URL');
  }

  async summarize(userId: number, text: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          this.flaskServiceUrl,
          { text },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.configService.get<string>('FLASK_SERVICE_TOKEN')}`,
            },
          },
        ),
      );
      const summary = response.data.summary;

      await this.prisma.messageLog.create({
        data: {
          userId,
          text,
          summary,
        },
      });

      return summary;
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

  async getLogs(userId: number): Promise<any> {
    try {
      const logs = await this.prisma.messageLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }, // Order logs by creation time
      });

      return logs;
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
