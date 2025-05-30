import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/typeorm/entities/feedback';
import { Comment } from 'src/typeorm/entities/comment';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
