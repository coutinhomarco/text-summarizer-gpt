import { Injectable } from '@nestjs/common';
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
    const response = await lastValueFrom(
      this.httpService.post(this.flaskServiceUrl, { text }),
    );
    const summary = response.data.summary;

    await this.prisma.messageLog.create({
      data: {
        userId,
        text,
        summary,
      },
    });

    return { summary };
  }

  async getLogs(userId: number): Promise<any> {
    return this.prisma.messageLog.findMany({
      where: { userId },
    });
  }
}
