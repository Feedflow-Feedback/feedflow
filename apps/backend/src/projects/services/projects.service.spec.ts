import { ProjectsService } from '../services/projects.service';

describe('ProjectsService (simple)', () => {
  let service: ProjectsService;
  let projectRepo: any;
  let userRepo: any;

  beforeEach(() => {
    projectRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    userRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    service = new ProjectsService(projectRepo, userRepo);
  });

  it('findAll calls projectRepo.find', async () => {
    projectRepo.find.mockResolvedValue(['project1']);
    const result = await service.findAll();
    expect(projectRepo.find).toHaveBeenCalled();
    expect(result).toEqual(['project1']);
  });

  it('findOne calls projectRepo.findOne with id', async () => {
    projectRepo.findOne.mockResolvedValue('project1');
    const result = await service.findOne('1');
    expect(projectRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toBe('project1');
  });

  it('create creates and saves a project and associates with user', async () => {
    const input = { name: 'p', userId: 'u' };
    userRepo.findOne.mockResolvedValue({ userId: 'u', projects: [] });
    projectRepo.create.mockReturnValue('newProject');
    projectRepo.save.mockResolvedValue('newProject');
    userRepo.save.mockResolvedValue(true);

    const result = await service.create(input);

    expect(userRepo.findOne).toHaveBeenCalled();
    expect(projectRepo.create).toHaveBeenCalledWith({
      name: 'p',
      description: undefined,
      url: undefined,
    });
    expect(projectRepo.save).toHaveBeenCalledWith('newProject');
    expect(userRepo.save).toHaveBeenCalled();
    expect(result).toBe('newProject');
  });

  it('delete calls projectRepo.delete', async () => {
    projectRepo.delete.mockResolvedValue('deleted');
    const result = await service.delete('1');
    expect(projectRepo.delete).toHaveBeenCalledWith('1');
    expect(result).toBe('deleted');
  });

  it('update calls projectRepo.update', async () => {
    projectRepo.update.mockResolvedValue('updated');
    const result = await service.update('1', { name: 'new' });
    expect(projectRepo.update).toHaveBeenCalledWith('1', { name: 'new' });
    expect(result).toBe('updated');
  });

  it('findAllUserProjects returns user projects', async () => {
    userRepo.findOne.mockResolvedValue({ projects: ['proj1'] });
    const result = await service.findAllUserProjects('u');
    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { userId: 'u' },
      relations: ['projects'],
    });
    expect(result).toEqual(['proj1']);
  });
});
