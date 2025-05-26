import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from '../services/projects.service';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { BadRequestException } from '@nestjs/common';

// Mock AuthGuard
class MockAuthGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let projectsService: ProjectsService;

  const mockProject = {
    id: 'a1b2c3d4',
    name: 'Test Project',
    url: 'https://test.com',
    description: 'Test description',
    created_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            create: jest.fn((dto) => {
              return {
                id: Math.random().toString(36).substring(2, 10),
                name: dto.name,
                url: dto.url,
                description: dto.description,
                created_at: new Date(),
              };
            }),
            findAllByIds: jest.fn().mockResolvedValue([mockProject]),
            findOne: jest.fn().mockResolvedValue(mockProject),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            update: jest.fn().mockImplementation((id, data) => ({
              ...mockProject,
              ...data,
            })),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a project', async () => {
      const projectData = {
        name: 'Test Project 2',
        url: 'https://test.com',
        description: 'Test description',
      };

      const result = await controller.create(projectData);

      expect(result).toEqual({
        id: expect.any(String),
        name: 'Test Project 2',
        url: 'https://test.com',
        description: 'Test description',
        created_at: expect.any(Date),
      });
      expect(projectsService.create).toHaveBeenCalledWith(projectData);
    });

    it('should throw BadRequestException if name is missing', async () => {
      const invalidData = {
        url: 'https://test.com',
        description: 'Test description',
      };

      jest
        .spyOn(projectsService, 'create')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.create(invalidData as any)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if url is missing', async () => {
      const invalidData = {
        name: 'Test Project',
        description: 'Test description',
      };

      jest
        .spyOn(projectsService, 'create')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.create(invalidData as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getMyProjects', () => {
    it('should return projects by ids', async () => {
      const result = await controller.getMyProjects({
        projectIds: ['a1b2c3d4'],
      });

      expect(result).toEqual([
        {
          id: 'a1b2c3d4',
          name: 'Test Project',
          url: 'https://test.com',
          description: 'Test description',
          created_at: expect.any(Date),
        },
      ]);
      expect(projectsService.findAllByIds).toHaveBeenCalledWith(['a1b2c3d4']);
    });

    it('should throw BadRequestException if projectIds is missing', async () => {
      jest
        .spyOn(projectsService, 'findAllByIds')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.getMyProjects({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getProjectDetails', () => {
    it('should return project details', async () => {
      const result = await controller.getProjectDetails({
        projectId: 'a1b2c3d4',
      });

      expect(result).toEqual({
        id: 'a1b2c3d4',
        name: 'Test Project',
        url: 'https://test.com',
        description: 'Test description',
        created_at: expect.any(Date),
      });
      expect(projectsService.findOne).toHaveBeenCalledWith('a1b2c3d4');
    });

    it('should throw BadRequestException if projectId is missing', async () => {
      jest
        .spyOn(projectsService, 'findOne')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.getProjectDetails({} as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a project', async () => {
      const result = await controller.delete('a1b2c3d4');

      expect(result).toEqual({ affected: 1 });
      expect(projectsService.delete).toHaveBeenCalledWith('a1b2c3d4');
    });

    it('should throw BadRequestException if id is invalid', async () => {
      jest
        .spyOn(projectsService, 'delete')
        .mockRejectedValue(new BadRequestException());

      await expect(controller.delete('invalid-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const updateData = { name: 'Updated Name' };
      const result = await controller.updateProject('a1b2c3d4', updateData);

      expect(result).toEqual({
        id: 'a1b2c3d4',
        name: 'Updated Name',
        url: 'https://test.com',
        description: 'Test description',
        created_at: expect.any(Date),
      });
      expect(projectsService.update).toHaveBeenCalledWith(
        'a1b2c3d4',
        updateData,
      );
    });

    it('should throw BadRequestException if no update data provided', async () => {
      jest
        .spyOn(projectsService, 'update')
        .mockRejectedValue(new BadRequestException());

      await expect(
        controller.updateProject('a1b2c3d4', {} as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
