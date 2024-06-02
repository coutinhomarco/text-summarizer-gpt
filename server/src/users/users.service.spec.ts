import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(prisma.user, 'create').mockResolvedValue(user);
    expect(await service.create(user)).toBe(user);
  });

  it('should find a user by username', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
    expect(await service.findOne('test')).toBe(user);
  });

  it('should delete a user', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
    jest.spyOn(prisma.user, 'delete').mockResolvedValue(user);
    expect(await service.delete('test')).toBe(user);
  });

  it('should find all users', async () => {
    const users = [
      { username: 'test1', password: 'password1', id: 1 },
      { username: 'test2', password: 'password2', id: 2 },
    ];
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);
    expect(await service.findAll()).toBe(users);
  });
});
