import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/project';

import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/user';
import { ConfigModule } from '@nestjs/config';

import { FeedbackModule } from './feedback/feedback.module';
import { Comment } from './typeorm/entities/comment';

import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      //host: 'mysql', // Must match Docker service name
      host: 'localhost', // Must match Docker service name
      port: 3306,
      username: 'root',
      password: 'hmJZKzJ&&rtYwq#ppB65', // From your docker-compose.yml
      database: 'feedflow',
      autoLoadEntities: true,
      synchronize: true,
      entities: [Project, Feedback, User, Comment],
    }),
    TypeOrmModule.forFeature([Project, User, Feedback, Comment]),

    ProjectsModule,

    UsersModule,

    AuthModule,

    FeedbackModule,

    CommentModule,
  ],
})
export class AppModule {}
