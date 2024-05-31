import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeService } from './summarize.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosHeaders } from 'axios';

describe('SummarizeService', () => {
  let service: SummarizeService;
  let prisma: PrismaService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          httpAgent: new axios.Axios({}),
        }),
      ],
      providers: [SummarizeService, ConfigService, PrismaService],
    }).compile();

    service = module.get<SummarizeService>(SummarizeService);
    prisma = module.get<PrismaService>(PrismaService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should summarize text', async () => {
    const text = 'test text';
    const summary = 'summary';
    const userId = 1;
    const response: AxiosResponse = {
      data: { summary },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        url: '',
        method: 'post',
        headers: new AxiosHeaders(),
        timeout: 0,
        withCredentials: false,
        responseType: 'json',
        maxContentLength: 0,
        maxBodyLength: 0,
      },
    };
    jest.spyOn(httpService, 'post').mockReturnValue(of(response));
    jest.spyOn(prisma.messageLog, 'create').mockResolvedValue({
      id: 1,
      userId,
      text,
      summary,
      createdAt: new Date(),
    });

    const result = await service.summarize(userId, text);
    expect(result).toEqual({ summary });
    expect(prisma.messageLog.create).toHaveBeenCalledWith({
      data: { userId, text, summary },
    });
  });

  it('should get logs', async () => {
    const userId = 1;
    const logs = [
      {
        id: 1,
        text: 'test',
        summary: 'summary',
        createdAt: new Date(),
        userId,
      },
    ];
    jest.spyOn(prisma.messageLog, 'findMany').mockResolvedValue(logs);

    const result = await service.getLogs(userId);
    expect(result).toEqual(logs);
    expect(prisma.messageLog.findMany).toHaveBeenCalledWith({
      where: { userId },
    });
  });
});
