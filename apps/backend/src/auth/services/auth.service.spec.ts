import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    userId: 'uuid',
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockUsersService = {
    findUserByEMailwithPassword: jest.fn(),
    findUserByEMail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hashedpassword'));
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authenticate', () => {
    it('should return auth result when credentials are valid', async () => {
      const input = { email: 'test@example.com', password: 'password' };
      mockUsersService.findUserByEMailwithPassword.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await service.authenticate(input);

      expect(result).toEqual({
        accessToken: 'mockToken',
        userId: mockUser.userId,
        email: mockUser.email,
      });
      expect(mockUsersService.findUserByEMailwithPassword).toHaveBeenCalledWith(
        input.email,
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        input.password,
        mockUser.password,
      );
      expect(mockJwtService.sign).toHaveBeenCalled();
    });

    it('should throw BadRequestException when credentials are invalid', async () => {
      const input = { email: 'test@example.com', password: 'wrongpassword' };
      mockUsersService.findUserByEMailwithPassword.mockResolvedValue(mockUser);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(service.authenticate(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const input = { email: 'new@example.com', password: 'password' };
      mockUsersService.findUserByEMail.mockResolvedValue(null);
      mockUsersService.createUser.mockResolvedValue({
        userId: 'new-uuid',
        email: input.email,
      });

      const result = await service.register(input);

      expect(result).toEqual({
        userId: 'new-uuid',
        email: input.email,
      });
      expect(mockUsersService.findUserByEMail).toHaveBeenCalledWith(
        input.email,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(mockUsersService.createUser).toHaveBeenCalledWith({
        email: input.email,
        password: 'hashedpassword',
      });
    });

    it('should throw BadRequestException when email already exists', async () => {
      const input = { email: 'test@example.com', password: 'password' };
      mockUsersService.findUserByEMail.mockResolvedValue(mockUser);

      await expect(service.register(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user data when credentials are valid', async () => {
      const input = { email: 'test@example.com', password: 'password' };
      mockUsersService.findUserByEMailwithPassword.mockResolvedValue(mockUser);

      const result = await service.validateUser(input);

      expect(result).toEqual({
        userId: mockUser.userId,
        email: mockUser.email,
      });
    });

    it('should throw BadRequestException when password is invalid', async () => {
      const input = { email: 'test@example.com', password: 'wrongpassword' };
      mockUsersService.findUserByEMailwithPassword.mockResolvedValue(mockUser);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(service.validateUser(input)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when user not found', async () => {
      const input = { email: 'nonexistent@example.com', password: 'password' };
      mockUsersService.findUserByEMailwithPassword.mockResolvedValue(null);

      await expect(service.validateUser(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('signIn', () => {
    it('should return auth result with access token', async () => {
      const userData = { userId: 'uuid', email: 'test@example.com' };
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await service.signIn(userData);

      expect(result).toEqual({
        accessToken: 'mockToken',
        userId: userData.userId,
        email: userData.email,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        userId: userData.userId,
        email: userData.email,
      });
    });
  });

  describe('hashPassword', () => {
    it('should return hashed password', async () => {
      const password = 'password';

      const result = await service['hashPassword'](password);

      expect(result).toBe('hashedpassword');
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });
});
