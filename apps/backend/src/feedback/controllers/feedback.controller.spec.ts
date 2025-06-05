import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from '../services/feedback.service';
import { BadRequestException } from '@nestjs/common';

describe('FeedbackController', () => {
  let controller: FeedbackController;

  const mockFeedbackService = {
    create: jest.fn((dto) => {
      return {
        title: dto.title,
        description: dto.description,
        projectId: dto.projectId,
        htmlElement: dto.htmlElement,
        author: dto.author,
        authorEmail: dto.authorEmail,
      };
    }),
    findByProjectId: jest.fn((projectId) => {
      return [
        {
          id: 'feedback-123',
          projectId: projectId,
        },
      ];
    }),
    updateStatus: jest.fn((feedbackId, status) => {
      return {
        id: feedbackId,
        status: status,
      };
    }),
  };

  const mockFeedback: any = {
    title: 'Title - Great work!',
    description: 'Great work!',
    projectId: 'project-123',
    htmlElement: {},
    author: 'Authro Name',
    authorEmail: 'author@mail.com',
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

  describe('create', () => {
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

  describe('getAllByProject', () => {
    it('should return feedbacks for a valid projectId', async () => {
      const projectId = 'project-123';
      const expectedFeedback = [
        {
          id: 'feedback-123',
          projectId: projectId,
        },
      ];

      const result = await controller.getByProject(projectId);
      expect(result).toEqual(expectedFeedback);
    });

    it('should throw BadRequestException if projectId is missing', async () => {
      await expect(controller.getByProject('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateFeedback', () => {
    it('should update feedback status successfully with valid data', async () => {
      const updateData = {
        feedbackId: 'feedback-123',
        status: 'resolved',
      };

      const expectedResult = {
        id: updateData.feedbackId,
        status: updateData.status,
      };

      const result = await controller.updateFeedback(updateData);
      expect(result).toEqual(expectedResult);
      expect(mockFeedbackService.updateStatus).toHaveBeenCalledWith(
        updateData.feedbackId,
        updateData.status,
      );
    });
    it('should not update feedback status because missing data', async () => {
      const updateData = {
        feedbackId: 'feedback-123',
      };

      await expect(controller.updateFeedback(updateData)).rejects.toThrow(
        BadRequestException,
      );
    });
    it('should not update feedback feedbackid because missing data', async () => {
      const updateData = {
        status: 'status',
      };

      await expect(controller.updateFeedback(updateData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
