import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<any | undefined> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(user: any) {
    return this.prisma.user.create({
      data: user,
    });
  }
}
