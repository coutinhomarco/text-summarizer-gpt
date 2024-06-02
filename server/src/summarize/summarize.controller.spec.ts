import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

describe('SummarizeController', () => {
  let controller: SummarizeController;
  let service: SummarizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarizeController],
      providers: [
        {
          provide: SummarizeService,
          useValue: {
            summarize: jest.fn(),
            getLogs: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SummarizeController>(SummarizeController);
    service = module.get<SummarizeService>(SummarizeService);
  });

  it('should summarize text', async () => {
    const req = { user: { userId: 1 } };
    const text = 'test';
    const summary = { summary: 'summary' };

    jest.spyOn(service, 'summarize').mockResolvedValue(summary);

    const result = await controller.summarize(req, text);
    expect(result).toEqual({ message: 'Summarization successful', summary });
    expect(service.summarize).toHaveBeenCalledWith(req.user.userId, text);
  });

  it('should get logs', async () => {
    const req = { user: { userId: 1 } };
    const createdAt = new Date();
    const logs = [{ id: 1, text: 'test', summary: 'summary', createdAt }];

    jest.spyOn(service, 'getLogs').mockResolvedValue(logs);

    const result = await controller.getLogs(req);
    expect(result).toEqual({ message: 'Logs retrieved successfully', logs });
    expect(service.getLogs).toHaveBeenCalledWith(req.user.userId);
  });
});
