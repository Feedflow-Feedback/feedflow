import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from '../services/feedback.service';
import { BadRequestException } from '@nestjs/common';
import { Feedback } from '../../typeorm/entities/feedback';

describe('FeedbackController', () => {
  let controller: FeedbackController;

  // Mock FeedbackService
  const mockFeedbackService = {
    create: jest.fn((dto) => {
      return {
        title: dto.title,
        description: dto.description,
        projectId: dto.projectId,
      };
    }),
  };

  const mockFeedback: any = {
    title: 'Title - Great work!',
    description: 'Great work!',
    projectId: 'project-123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [FeedbackService],
    })
      .overrideProvider(FeedbackService)
      .useValue(mockFeedbackService)
      .compile();
    controller = module.get<FeedbackController>(FeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create feedback successfully', async () => {
    const result = await controller.create(mockFeedback);

    expect(result).toEqual(mockFeedback);
  });

  it('should throw BadRequestException if description is missing', async () => {
    const invalidDto = {
      title: 'title',
      projectId: 'project-123',
    };

    await expect(controller.create(invalidDto as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if title is missing', async () => {
    const invalidDto = {
      description: 'description',
      projectId: 'project-123',
    };

    await expect(controller.create(invalidDto as any)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if project Id is missing', async () => {
    const invalidDto = {
      description: 'description',
      title: 'title',
    };

    await expect(controller.create(invalidDto as any)).rejects.toThrow(
      BadRequestException,
    );
  });
});
