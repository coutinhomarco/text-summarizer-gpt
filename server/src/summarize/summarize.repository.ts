import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SummarizeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMessageLog(userId: number, text: string, summary: string) {
    // Verify that the user exists
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

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
