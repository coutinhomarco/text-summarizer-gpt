import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeService } from './summarize.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { of } from 'rxjs';

describe('SummarizeService', () => {
  let service: SummarizeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummarizeService,
        {
          provide: HttpService,
          useValue: {
            post: jest
              .fn()
              .mockReturnValue(of({ data: { summary: 'summary' } })),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:5000'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            messageLog: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SummarizeService>(SummarizeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should summarize text', async () => {
    const userId = 1;
    const text = 'test';
    const summary = 'summary';

    jest.spyOn(prisma.messageLog, 'create').mockResolvedValue({
      id: 1,
      userId,
      text,
      summary,
      createdAt: new Date(),
    });

    const result = await service.summarize(userId, text);
    expect(result).toEqual(summary); // The service returns the summary string
    expect(prisma.messageLog.create).toHaveBeenCalledWith({
      data: { userId, text, summary },
    });
  });
});
