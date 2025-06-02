import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from '../services/comment.service';
import { BadRequestException } from '@nestjs/common';
import { Comment } from '../../typeorm/entities/comment';

describe('CommentController', () => {
  let controller: CommentController;
  let commentService: CommentService;

  const mockCommentService = {
    create: jest.fn().mockImplementation((dto) => {
      return Promise.resolve({
        id: 1,
        ...dto,
        createdAt: new Date(),
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a comment', async () => {
      const dto = {
        comment: 'Test comment',
        author: 'Test Author',
        authorEmail: 'test@example.com',
        feedbackId: 1,
      };

      const result = await controller.create(dto);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ...dto,
          createdAt: expect.any(Date),
        }),
      );
      expect(commentService.create).toHaveBeenCalledWith(dto);
    });

    it('should throw BadRequestException when required fields are missing', async () => {
      const testCases = [
        {
          dto: { author: 'Test', authorEmail: 'test@test.com', feedbackId: 1 },
          missingField: 'comment',
        },
        {
          dto: { comment: 'Test', authorEmail: 'test@test.com', feedbackId: 1 },
          missingField: 'author',
        },
        {
          dto: { comment: 'Test', author: 'Test', feedbackId: 1 },
          missingField: 'authorEmail',
        },
        {
          dto: {
            comment: 'Test',
            author: 'Test',
            authorEmail: 'test@test.com',
          },
          missingField: 'feedbackId',
        },
      ];

      for (const testCase of testCases) {
        await expect(controller.create(testCase.dto as any)).rejects.toThrow(
          BadRequestException,
        );

        await expect(controller.create(testCase.dto as any)).rejects.toThrow(
          `${testCase.missingField} is required`,
        );
      }

      expect(commentService.create).not.toHaveBeenCalled();
    });

    it('should pass complete dto to service layer', async () => {
      const dto = {
        comment: 'Test comment',
        author: 'Test Author',
        authorEmail: 'test@example.com',
        feedbackId: 1,
        additionalField: 'extra data',
      };

      await controller.create(dto);

      expect(commentService.create).toHaveBeenCalledWith(dto);
    });
  });
});
