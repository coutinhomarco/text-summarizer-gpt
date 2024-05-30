import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SummarizeService {
  private flaskServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.flaskServiceUrl = this.configService.get<string>('FLASK_SERVICE_URL');
  }

  async summarize(text: string): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.post(this.flaskServiceUrl, { text }),
    );
    return response.data;
  }
}
