import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackService } from './feedback.service';
import { Feedback } from '../../typeorm/entities/feedback';
import { Project } from '../../typeorm/entities/project';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let feedbackRepo: Repository<Feedback>;
  let projectRepo: Repository<Project>;

  const mockCreateDto = {
    projectId: 'project-123',
    description: 'Test description',
    title: 'Test title',
    author: 'Test Author',
    authorEmail: 'author@test.com',
    imageData: 'image-data-string',
    htmlElement: { id: 'element-123' },
  };

  const mockProject = {
    id: 'project-123',
    name: 'Test Project',
  };

  const mockFeedback = {
    id: 'feedback-123',
    description: 'Test description',
    title: 'Test title',
    status: 'open',
    project: mockProject,
    imageData: Buffer.from('image-data-string'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({
              ...dto,
              id: 'feedback-123',
              status: 'open',
            })),
            save: jest
              .fn()
              .mockImplementation((feedback) => Promise.resolve(feedback)),
            find: jest.fn().mockResolvedValue([mockFeedback]), // Added for findByProjectId
            update: jest.fn().mockResolvedValue({ affected: 1 }), // For updateStatus if needed
          },
        },
        {
          provide: getRepositoryToken(Project),
          useValue: {
            findOneByOrFail: jest
              .fn()
              .mockImplementation(({ id }) =>
                id === mockProject.id
                  ? Promise.resolve(mockProject)
                  : Promise.reject(new Error('Not found')),
              ),
          },
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    feedbackRepo = module.get<Repository<Feedback>>(
      getRepositoryToken(Feedback),
    );
    projectRepo = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create feedback with image', async () => {
      const result = await service.create(mockCreateDto);

      expect(projectRepo.findOneByOrFail).toHaveBeenCalledWith({
        id: mockCreateDto.projectId,
      });
      expect(feedbackRepo.create).toHaveBeenCalledWith({
        description: mockCreateDto.description,
        title: mockCreateDto.title,
        author: mockCreateDto.author,
        authorEmail: mockCreateDto.authorEmail,
        imageData: Buffer.from(mockCreateDto.imageData),
        status: 'open',
        htmlElement: mockCreateDto.htmlElement,
        project: mockProject,
      });
      expect(feedbackRepo.save).toHaveBeenCalled();
      expect(result.status).toBe('open');
      expect(result.id).toBe('feedback-123');
      expect(result.imageData).toBeInstanceOf(Buffer);
    });

    it('should create feedback without image when imageData not provided', async () => {
      const dtoWithoutImage = { ...mockCreateDto, imageData: undefined };
      await service.create(dtoWithoutImage);

      expect(feedbackRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          imageData: undefined,
        }),
      );
    });

    it('should throw error when project not found', async () => {
      const invalidDto = { ...mockCreateDto, projectId: 'invalid-project' };

      await expect(service.create(invalidDto)).rejects.toThrow('Not found');
      expect(feedbackRepo.create).not.toHaveBeenCalled();
      expect(feedbackRepo.save).not.toHaveBeenCalled();
    });

    it('should set default status to "open"', async () => {
      const result = await service.create(mockCreateDto);
      expect(result.status).toBe('open');
    });
  });

  describe('findByProjectId', () => {
    it('should return feedback array with relations', async () => {
      const result = await service.findByProjectId(mockProject.id);

      expect(feedbackRepo.find).toHaveBeenCalledWith({
        where: { project: { id: mockProject.id } },
        relations: ['project', 'comments'],
      });
      expect(result).toEqual([mockFeedback]);
    });

    it('should return empty array if no feedback found', async () => {
      jest.spyOn(feedbackRepo, 'find').mockResolvedValueOnce([]);
      const result = await service.findByProjectId(mockProject.id);

      expect(result).toEqual([]);
    });
  });
  describe('updateStatus', () => {
    it('should call update with correct params and return result', async () => {
      const mockResult = {
        raw: {},
        affected: 1,
        generatedMaps: [],
      };
      jest.spyOn(feedbackRepo, 'update').mockResolvedValue(mockResult);

      const result = await service.updateStatus('feedback-123', 'closed');

      expect(feedbackRepo.update).toHaveBeenCalledWith('feedback-123', {
        status: 'closed',
      });
      expect(result).toBe(mockResult);
    });
  });
});
