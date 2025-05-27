import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../typeorm/entities/project';
import { Repository } from 'typeorm';
import { User } from '../../typeorm/entities/user';

type ProjectAndUser = {
  name: string;
  description?: string;
  userId: string;
  url?: string;
};

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.projectRepo.find();
  }

  findOne(id: string) {
    return this.projectRepo.findOne({ where: { id } });
  }

  async create(data: ProjectAndUser) {
    const { name, description, url, userId } = data;

    const user = await this.usersRepo.findOne({
      where: { userId },
      relations: ['projects'], // Load current projects
    });

    if (!user) {
      throw new Error('User not found');
    }

    const project = this.projectRepo.create({ name, description, url });

    const savedProject = await this.projectRepo.save(project);

    // Add the project to the user's projects
    user.projects = [...(user.projects || []), savedProject];

    await this.usersRepo.save(user);

    return savedProject;
  }

  async findAllUserProjects(userId: string) {
    const user = await this.usersRepo.findOne({
      where: { userId },
      relations: ['projects'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.projects;
  }

  async delete(id: string) {
    return this.projectRepo.delete(id);
  }
  async update(id: string, updateData: Partial<Project>) {
    return this.projectRepo.update(id, updateData);
  }
}
