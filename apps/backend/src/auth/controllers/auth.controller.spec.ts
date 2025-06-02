import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    authenticate: jest.fn().mockResolvedValue({
      userId: 'some-id',
      email: 'tibo@pino.ch',
    }),
    login: jest.fn(),
    register: jest.fn(),
  };

  const mockUsersService = {
    findUserByEMail: jest.fn(),
    findUserByEMailwithPassword: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('AuthController', () => {
    it('should login a user', async () => {
      const result = await controller.login({
        email: 'tibo@pino.ch',
        password: '123456',
      });

      expect(result).toEqual({
        userId: expect.any(String),
        email: 'tibo@pino.ch',
      });
    });
    it('should throw BadRequestException when authentication fails (synchronous)', () => {
      mockAuthService.authenticate.mockReturnValue(null);

      expect(() =>
        controller.login({
          email: 'wrong@email.com',
          password: 'wrongpassword',
        }),
      ).toThrow(BadRequestException);
    });
  });
  describe('register', () => {
    const registerInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: '1',
      email: 'test@example.com',
    };

    it('should throw BadRequestException if email already exists', async () => {
      mockUsersService.findUserByEMail.mockResolvedValue(mockUser);
      mockAuthService.register.mockRejectedValue(
        new BadRequestException('User with this email already exists'),
      );
      await expect(controller.register(registerInput)).rejects.toThrow(
        BadRequestException,
      );

      await expect(controller.register(registerInput)).rejects.toThrow(
        'User with this email already exists',
      );
    });
  });
});
