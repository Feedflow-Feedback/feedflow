import { CommentService } from '../services/comment.service';
import { Comment } from '../../typeorm/entities/comment';

import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  Patch,
  BadRequestException,
} from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() dto: any): Promise<Comment> {
    const requiredFields = ['comment', 'author', 'authorEmail', 'feedbackId'];
    for (const field of requiredFields) {
      if (!dto[field]) {
        throw new BadRequestException(`${field} is required`);
      }
    }

    return this.commentService.create(dto);
  }
}
