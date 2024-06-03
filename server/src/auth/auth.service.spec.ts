import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

const mockAuthRepository = {
  findUserByUsername: jest.fn(),
  createUser: jest.fn(),
};

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
          provide: AuthRepository,
          useValue: mockAuthRepository,
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

      jest.spyOn(mockAuthRepository, 'findUserByUsername').mockResolvedValue({
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

      jest
        .spyOn(mockAuthRepository, 'findUserByUsername')
        .mockResolvedValue(null);
      jest
        .spyOn(mockAuthRepository, 'createUser')
        .mockResolvedValue(createdUser);

      const result = await service.register(user);
      expect(result).toEqual({
        id: createdUser.id,
        username: createdUser.username,
      });
    });
  });
});
