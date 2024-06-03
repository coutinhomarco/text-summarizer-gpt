import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userRepository, 'create').mockResolvedValue(user);
    expect(await service.create(user)).toBe(user);
  });

  it('should find a user by username', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    expect(await service.findOne('test')).toBe(user);
  });

  it('should delete a user', async () => {
    const user = { username: 'test', password: 'password', id: 1 };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(userRepository, 'delete').mockResolvedValue(user);
    expect(await service.delete('test')).toBe(user);
  });

  it('should find all users', async () => {
    const users = [
      { username: 'test1', password: 'password1', id: 1 },
      { username: 'test2', password: 'password2', id: 2 },
    ];
    jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);
    expect(await service.findAll()).toBe(users);
  });
});
