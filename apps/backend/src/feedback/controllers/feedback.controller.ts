// feedback.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { FeedbackService } from '../services/feedback.service';

import { Feedback } from 'src/typeorm/entities/feedback';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() dto: any): Promise<Feedback> {
    return this.feedbackService.create(dto);
  }
}
