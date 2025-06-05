import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
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
    if (
      !dto.description ||
      !dto.title ||
      !dto.projectId ||
      !dto.htmlElement ||
      !dto.author ||
      !dto.authorEmail
    ) {
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

  @HttpCode(HttpStatus.OK)
  @Patch('updateFeedback')
  async updateFeedback(@Body() data: any) {
    if (!data.feedbackId || !data.status) {
      throw new BadRequestException('feedbackId & status is required');
    }

    return this.feedbackService.updateStatus(data.feedbackId, data.status);
  }
}
