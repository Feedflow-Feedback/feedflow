// feedback.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from '../../typeorm/entities/feedback';
import { Repository } from 'typeorm';

import { Project } from '../../typeorm/entities/project';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepo: Repository<Feedback>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async create(createDto: any): Promise<Feedback> {
    const project = await this.projectRepo.findOneByOrFail({
      id: createDto.projectId,
    });

    const feedback = this.feedbackRepo.create({
      description: createDto.description,
      title: createDto.title,
      author: createDto.author,
      authorEmail: createDto.authorEmail,
      imageData: createDto.imageData, // Assuming imageData is a Buffer
      //metadata: createDto.metadata,
      status: 'open',
      htmlElement: createDto.htmlElement,
      project,
    });

    return this.feedbackRepo.save(feedback);
  }

  async findByProjectId(projectId: string): Promise<Feedback[]> {
    return this.feedbackRepo.find({
      where: { project: { id: projectId } },
      relations: ['project'],
    });
  }

  async updateStatus(id: string, status: any) {
    return this.feedbackRepo.update(id, { status });
  }
}
