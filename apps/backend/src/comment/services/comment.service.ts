import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from '../../typeorm/entities/feedback';
import { Repository } from 'typeorm';
import { Comment } from '../../typeorm/entities/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepo: Repository<Feedback>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
  ) {}

  async create(createDto: any): Promise<Comment> {
    const feedback = await this.feedbackRepo.findOneByOrFail({
      id: createDto.feedbackId,
    });

    const comment = this.commentRepo.create({
      comment: createDto.comment,
      author: createDto.author,
      authorEmail: createDto.authorEmail,
      feedback,
    });

    return this.commentRepo.save(comment);
  }
}
