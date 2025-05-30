import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/typeorm/entities/feedback';
import { FeedbackService } from './services/feedback.service';
import { FeedbackController } from './controllers/feedback.controller';
import { Project } from 'src/typeorm/entities/project';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Project])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
