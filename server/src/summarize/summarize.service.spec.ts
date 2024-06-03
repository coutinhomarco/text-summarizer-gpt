import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeService } from './summarize.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SummarizeRepository } from './summarize.repository';
import { of } from 'rxjs';

describe('SummarizeService', () => {
  let service: SummarizeService;
  let repository: SummarizeRepository;

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
          provide: SummarizeRepository,
          useValue: {
            createMessageLog: jest.fn(),
            findLogsByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SummarizeService>(SummarizeService);
    repository = module.get<SummarizeRepository>(SummarizeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should summarize text', async () => {
    const userId = 1;
    const text = 'test';
    const summary = 'summary';

    jest.spyOn(repository, 'createMessageLog').mockResolvedValue({
      id: 1,
      userId,
      text,
      summary,
      createdAt: new Date(),
    });

    const result = await service.summarize(userId, text);
    expect(result).toEqual(summary);
    expect(repository.createMessageLog).toHaveBeenCalledWith(
      userId,
      text,
      summary,
    );
  });
});
