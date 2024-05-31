import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeController } from './summarize.controller';
import { SummarizeService } from './summarize.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import axios from 'axios';

describe('SummarizeController', () => {
  let controller: SummarizeController;
  let service: SummarizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          httpAgent: new axios.Axios({}),
        }),
      ],
      controllers: [SummarizeController],
      providers: [SummarizeService, ConfigService, PrismaService],
    }).compile();

    controller = module.get<SummarizeController>(SummarizeController);
    service = module.get<SummarizeService>(SummarizeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should summarize text', async () => {
    const text = 'test text';
    const summary = 'summary';
    const userId = 1;
    const req = { user: { userId } };
    jest.spyOn(service, 'summarize').mockResolvedValue({ summary });

    const result = await controller.summarize(req, text);
    expect(result).toEqual({ summary });
    expect(service.summarize).toHaveBeenCalledWith(userId, text);
  });

  it('should get logs', async () => {
    const userId = 1;
    const logs = [{ id: 1, text: 'test', summary: 'summary' }];
    const req = { user: { userId } };
    jest.spyOn(service, 'getLogs').mockResolvedValue(logs);

    const result = await controller.getLogs(req);
    expect(result).toEqual(logs);
    expect(service.getLogs).toHaveBeenCalledWith(userId);
  });
});
