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

  it('creates and saves a project', async () => {
    const input = { name: 'p', userId: 'u' };

    const mockUser = { userId: 'u' };
    const mockProject = { name: 'p', user: mockUser };

    userRepo.findOne.mockResolvedValue(mockUser);
    projectRepo.create.mockReturnValue(mockProject);
    projectRepo.save.mockResolvedValue(mockProject);

    const result = await service.create(input);

    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { userId: 'u' } });

    expect(projectRepo.create).toHaveBeenCalledWith({
      name: 'p',
      description: undefined,
      url: undefined,
      user: mockUser,
    });

    expect(projectRepo.save).toHaveBeenCalledWith(mockProject);
    expect(userRepo.save).not.toHaveBeenCalled();
    expect(result).toBe(mockProject);
  });

  it('throws an error when user is not found during project creation', async () => {
    const input = { name: 'p', userId: 'u' };
    userRepo.findOne.mockResolvedValue(undefined);

    await expect(service.create(input)).rejects.toThrow('User not found');

    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { userId: 'u' },
    });

    expect(projectRepo.create).not.toHaveBeenCalled();
    expect(projectRepo.save).not.toHaveBeenCalled();
    expect(userRepo.save).not.toHaveBeenCalled();
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
  it('should update a project', async () => {
    const id = '123';
    const updateData = { name: 'New Name' };

    const mockUpdateResult = { affected: 1 };
    jest
      .spyOn(projectRepo, 'update')
      .mockResolvedValue(mockUpdateResult as any);

    const result = await service.update(id, updateData);

    expect(projectRepo.update).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(mockUpdateResult);
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

  it('findAllUserProjects throws error if user not found', async () => {
    userRepo.findOne.mockResolvedValue(undefined);
    await expect(service.findAllUserProjects('u')).rejects.toThrow(
      'User not found',
    );
    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { userId: 'u' },
      relations: ['projects'],
    });
  });
});
