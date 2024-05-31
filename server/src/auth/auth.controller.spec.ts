import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token', async () => {
      const req = { user: { id: 1, username: 'testuser' } };
      const token = { access_token: 'test-token' };

      jest.spyOn(service, 'login').mockResolvedValue(token);

      const result = await controller.login(req);
      expect(result).toEqual(token);
      expect(service.login).toHaveBeenCalledWith(req.user);
    });
  });

  describe('register', () => {
    it('should create a new user and return the user data', async () => {
      const createUserDto = { username: 'testuser', password: 'testpassword' };
      const createdUser = {
        ...createUserDto,
        id: 1,
        password: 'hashedpassword',
      };

      jest.spyOn(service, 'register').mockResolvedValue(createdUser);

      const result = await controller.register(createUserDto);
      expect(result).toEqual(createdUser);
      expect(service.register).toHaveBeenCalledWith(createUserDto);
    });
  });
});
