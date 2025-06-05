import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;

  const mockProject = {
    id: '1',
    name: 'Test Project',
    description: 'Test Description',
    url: 'http://test.com',
  };

  const mockProjects = [mockProject];

  const mockProjectsService = {
    create: jest.fn().mockResolvedValue(mockProject),
    findAllUserProjects: jest.fn().mockResolvedValue(mockProjects),
    findOne: jest.fn().mockResolvedValue(mockProject),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const projectData = {
        name: 'Test Project',
        description: 'Test Description',
        userId: 'user1',
        url: 'http://test.com',
      };

      const result = await controller.create(projectData);

      expect(result).toEqual(mockProject);
      expect(projectsService.create).toHaveBeenCalledWith(projectData);
    });
  });

  describe('getMyProjects', () => {
    it('should return all projects for a user', async () => {
      const userId = { userId: 'user1' };
      const result = await controller.getMyProjects(userId);

      expect(result).toEqual(mockProjects);
      expect(projectsService.findAllUserProjects).toHaveBeenCalledWith(
        userId.userId,
      );
    });

    it('should return empty array if no projects exist', async () => {
      mockProjectsService.findAllUserProjects.mockResolvedValueOnce([]);
      const userId = { userId: 'user1' };
      const result = await controller.getMyProjects(userId);

      expect(result).toEqual([]);
    });
  });

  describe('getProjectDetails', () => {
    it('should return project details', async () => {
      const projectData = { projectId: '1' };
      const result = await controller.getProjectDetails(projectData);

      expect(result).toEqual(mockProject);
      expect(projectsService.findOne).toHaveBeenCalledWith(
        projectData.projectId,
      );
    });

    it('should return undefined for non-existent project', async () => {
      mockProjectsService.findOne.mockResolvedValueOnce(undefined);
      const projectData = { projectId: '999' };
      const result = await controller.getProjectDetails(projectData);

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      const projectId = '1';
      const result = await controller.delete(projectId);

      expect(result).toEqual({ affected: 1 });
      expect(projectsService.delete).toHaveBeenCalledWith(projectId);
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const projectId = '1';
      const updateData = {
        name: 'Updated Name',
        description: 'Updated Description',
      };

      const result = await controller.updateProject(projectId, updateData);

      expect(result).toEqual({ affected: 1 });
      expect(projectsService.update).toHaveBeenCalledWith(
        projectId,
        updateData,
      );
    });
  });
});
