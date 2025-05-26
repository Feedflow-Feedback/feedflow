import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../typeorm/entities/user';

describe('UserService', () => {
  let service: UsersService;

  const mockUser = {
    userId: 'uuid',
    email: 'test@example.com',
    password: 'hashedpassword',
    projectIds: [],
  };

  const mockUsersRepository = {
    create: jest.fn((dto) => {
      return { userId: 'userId', ...dto };
    }),

    save: jest
      .fn()
      .mockImplementation((dto) =>
        Promise.resolve({ userId: 'userId', ...dto }),
      ),

    findOne: jest.fn().mockImplementation((options) => {
      if (options.where.email === 'test@example.com') {
        return Promise.resolve(mockUser);
      }
      if (options.where.userId === 'uuid') {
        return Promise.resolve(mockUser);
      }
      return Promise.resolve(null);
    }),

    createQueryBuilder: jest.fn(() => ({
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockImplementation(() => {
        return Promise.resolve(mockUser);
      }),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user record and return user', async () => {
    expect(
      await service.createUser({ email: 'tibo@pino.ch', password: 'password' }),
    ).toEqual({
      userId: expect.any(String),
      email: 'tibo@pino.ch',
    });
  });

  describe('findUserByEMail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const result = await service.findUserByEMail(email);

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null when user not found', async () => {
      const email = 'nonexistent@example.com';
      const result = await service.findUserByEMail(email);

      expect(result).toBeNull();
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('findUserByUserId', () => {
    it('should find user by userId', async () => {
      const userId = 'uuid';
      const result = await service.findUserByUserId(userId);

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    it('should return null when user not found', async () => {
      const userId = 'nonexistent-uuid';
      const result = await service.findUserByUserId(userId);

      expect(result).toBeNull();
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });
    });
  });
  describe('findUserByEMailwithPassword', () => {
    it('should find user by email with password field', async () => {
      const email = 'test@example.com';
      const result = await service.findUserByEMailwithPassword(email);

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should return null when user not found', async () => {
      mockUsersRepository.createQueryBuilder = jest.fn(() => ({
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      }));

      const email = 'nonexistent@example.com';
      const result = await service.findUserByEMailwithPassword(email);

      expect(result).toBeNull();
      expect(mockUsersRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
