import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../typeorm/entities/project';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user';

type ProjectAndUser = {
  name: string;
  description?: string;
  userId: string;
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
    const project = this.projectRepo.create(data);

    const savedProject = await this.projectRepo.save(project);

    if (data.userId) {
      const user = await this.usersRepo.findOne({
        where: { userId: data.userId },
      });
      if (user) {
        user.projectIds = [...(user.projectIds || []), savedProject.id];
        await this.usersRepo.save(user);
      }
    }

    return savedProject;
  }

  async findAllByIds(projectIds: string[]) {
    const projects: Project[] = [];
    for (const id of projectIds) {
      const project = await this.projectRepo.findOne({ where: { id } });
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  }

  async delete(id: string) {
    return this.projectRepo.delete(id);
  }
}
