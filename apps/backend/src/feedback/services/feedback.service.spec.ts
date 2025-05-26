import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Feedback } from '../../typeorm/entities/feedback';
import { Project } from '../../typeorm/entities/project';

describe('FeedbackService', () => {
  let service: FeedbackService;

  const mockFeedbackRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockProjectRepository = {
    findOneByOrFail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: mockFeedbackRepository,
        },
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
