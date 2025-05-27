// feedback.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { FeedbackService } from '../services/feedback.service';

import { Feedback } from 'src/typeorm/entities/feedback';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() dto: any): Promise<Feedback> {
    if (!dto.description || !dto.title || !dto.projectId || !dto.htmlElement) {
      throw new BadRequestException(
        'title, description, and projectId are required',
      );
    }

    return this.feedbackService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('getAllByProject')
  async getByProject(
    @Body('projectId') projectId: string,
  ): Promise<Feedback[]> {
    if (!projectId) {
      throw new BadRequestException('projectId is required');
    }

    return this.feedbackService.findByProjectId(projectId);
  }
}
