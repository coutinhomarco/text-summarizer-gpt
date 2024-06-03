import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { SummarizeRepository } from './summarize.repository';

@Injectable()
export class SummarizeService {
  private flaskServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private summarizeRepository: SummarizeRepository,
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
            },
          },
        ),
      );

      const summary = response.data.summary;
      await this.summarizeRepository.createMessageLog(userId, text, summary);

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
      return await this.summarizeRepository.findLogsByUser(userId);
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
