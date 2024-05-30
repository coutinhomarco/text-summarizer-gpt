import { Controller, Post, Body } from '@nestjs/common';
import { SummarizeService } from './summarize.service';

@Controller('summarize')
export class SummarizeController {
  constructor(private summarizeService: SummarizeService) {}

  @Post()
  async summarize(@Body('text') text: string) {
    return this.summarizeService.summarize(text);
  }
}
