// feedback.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/typeorm/entities/feedback';
import { Repository } from 'typeorm';

import { Project } from 'src/typeorm/entities/project';

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
      metadata: createDto.metadata,
      status: createDto.status ?? 'open',

      project,
    });

    return this.feedbackRepo.save(feedback);
  }
}
