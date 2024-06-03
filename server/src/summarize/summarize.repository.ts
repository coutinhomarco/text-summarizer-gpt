import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SummarizeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessageLog(userId: number, text: string, summary: string) {
    return this.prisma.messageLog.create({
      data: { userId, text, summary },
    });
  }

  async findLogsByUser(userId: number) {
    return this.prisma.messageLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
