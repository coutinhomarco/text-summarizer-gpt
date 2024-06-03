import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const token = { token: 'test-token' };
      const returnData = { message: 'Login successful', token: token.token };

      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const result = await authController.login({
        user: { username: 'test', password: 'test' },
      });
      expect(result).toEqual(returnData);
    });
  });
});
