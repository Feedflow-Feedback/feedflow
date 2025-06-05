import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentService } from './comment.service';
import { Comment } from '../../typeorm/entities/comment';
import { Feedback } from '../../typeorm/entities/feedback';
import { NotFoundException } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository: Repository<Comment>;
  let feedbackRepository: Repository<Feedback>;

  const mockFeedback = {
    id: 1,
    title: 'Test Feedback',
    description: 'Test Description',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest
              .fn()
              .mockImplementation((comment) =>
                Promise.resolve({ id: 1, ...comment, createdAt: new Date() }),
              ),
          },
        },
        {
          provide: getRepositoryToken(Feedback),
          useValue: {
            findOneByOrFail: jest.fn().mockImplementation(({ id }) => {
              if (id === 1) return Promise.resolve(mockFeedback);
              throw new NotFoundException();
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
    feedbackRepository = module.get<Repository<Feedback>>(
      getRepositoryToken(Feedback),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a comment', async () => {
      const createDto = {
        comment: 'Test comment',
        author: 'Test Author',
        authorEmail: 'test@example.com',
        feedbackId: 1,
      };

      const result = await service.create(createDto);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          comment: createDto.comment,
          author: createDto.author,
          authorEmail: createDto.authorEmail,
          feedback: mockFeedback,
          createdAt: expect.any(Date),
        }),
      );

      expect(feedbackRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: createDto.feedbackId,
      });
      expect(commentRepository.create).toHaveBeenCalledWith({
        comment: createDto.comment,
        author: createDto.author,
        authorEmail: createDto.authorEmail,
        feedback: mockFeedback,
      });
      expect(commentRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when feedback does not exist', async () => {
      const createDto = {
        comment: 'Test comment',
        author: 'Test Author',
        authorEmail: 'test@example.com',
        feedbackId: 999,
      };

      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(feedbackRepository.findOneByOrFail).toHaveBeenCalledWith({
        id: createDto.feedbackId,
      });
      expect(commentRepository.create).not.toHaveBeenCalled();
      expect(commentRepository.save).not.toHaveBeenCalled();
    });

    it('should pass all comment data to repository', async () => {
      const createDto = {
        comment: 'Test comment',
        author: 'Test Author',
        authorEmail: 'test@example.com',
        feedbackId: 1,
        extraField: 'extra data',
      };

      await service.create(createDto);

      expect(commentRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          comment: createDto.comment,
          author: createDto.author,
          authorEmail: createDto.authorEmail,
          feedback: mockFeedback,
        }),
      );
    });
  });
});
