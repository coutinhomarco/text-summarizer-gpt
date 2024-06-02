export const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { username: 'test', password: 'test' };
      const token = { token: 'test-token' };

      jest.spyOn(mockPrismaService.user, 'findUnique').mockResolvedValue({
        id: 1,
        username: 'test',
        password: bcrypt.hashSync('test', 8),
      });

      expect(await service.login(user)).toEqual(token);
    });
  });

  describe('register', () => {
    it('should create a new user and return the user data', async () => {
      const user = { username: 'testuser', password: 'password123' };
      const createdUser = {
        id: 1,
        username: 'testuser',
        password: bcrypt.hashSync('password123', 8),
      };

      jest.spyOn(mockPrismaService.user, 'findUnique').mockResolvedValue(null);
      jest
        .spyOn(mockPrismaService.user, 'create')
        .mockResolvedValue(createdUser);

      const result = await service.register(user);
      expect(result).toEqual({
        id: createdUser.id,
        username: createdUser.username,
      });
    });
  });
});
