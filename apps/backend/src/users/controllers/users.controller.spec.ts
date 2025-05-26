import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn((dto) => {
      return {
        userId: '1',
        email: dto.email,
      };
    }),
    findUserByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  /*************** Create User ******************/
  it('should create a user', async () => {
    const result = await controller.createUser({
      email: 'tibo@pino.ch',
      password: '123456',
    });

    expect(result).toEqual({
      userId: expect.any(String),
      email: 'tibo@pino.ch',
    });
  });

  it('should throw BadRequestException if email is missing', async () => {
    await expect(
      controller.createUser({ password: '123456' } as any),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if email is missing', async () => {
    await expect(
      controller.createUser({ email: 'tibo@pino.ch' } as any),
    ).rejects.toThrow(BadRequestException);
  });

  /*************** Get Projects ******************/

  it('should return projectIds when user is found', async () => {
    mockUsersService.findUserByUserId.mockResolvedValueOnce({
      userId: '1',
      projectIds: ['proj1', 'proj2'],
    });

    const result = await controller.getProjectIds({ userId: '1' });
    expect(result).toEqual(['proj1', 'proj2']);
  });

  it('should return empty array if user not found', async () => {
    mockUsersService.findUserByUserId.mockResolvedValueOnce(undefined);

    const result = await controller.getProjectIds({ userId: 'not-found' });
    expect(result).toEqual([]);
  });

  it('should throw BadRequestException if userId is missing', async () => {
    await expect(controller.getProjectIds({})).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should call findUserByUserId with correct userId', async () => {
    mockUsersService.findUserByUserId.mockResolvedValueOnce({ projectIds: [] });

    await controller.getProjectIds({ userId: '123' });
    expect(mockUsersService.findUserByUserId).toHaveBeenCalledWith('123');
  });
});
