import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password when valid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const hashedPassword = bcrypt.hashSync(password, 8);
      const user = { id: 1, username, password: hashedPassword };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      const result = await service.validateUser(username, password);
      expect(result).toEqual({ id: 1, username });
    });

    it('should return null when invalid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'testpassword';

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

      const result = await service.validateUser(username, password);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const user = { id: 1, username: 'testuser' };
      const payload = { username: user.username, sub: user.id };
      const token = 'test-token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('register', () => {
    it('should create a new user and return the user data', async () => {
      const user = { username: 'testuser', password: 'testpassword' };
      const hashedPassword = bcrypt.hashSync(user.password, 8);
      const createdUser = { ...user, id: 1, password: hashedPassword };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(createdUser);
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);

      const result = await service.register(user);
      expect(result).toEqual(createdUser);
    });
  });
});
