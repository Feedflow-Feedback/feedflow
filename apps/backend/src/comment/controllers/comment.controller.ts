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
    if (!dto.comment || !dto.author || !dto.authorEmail || !dto.feedbackId) {
      throw new BadRequestException(
        'author, comment, autherEmail, Feedbackid are required',
      );
    }

    return this.commentService.create(dto);
  }
}
