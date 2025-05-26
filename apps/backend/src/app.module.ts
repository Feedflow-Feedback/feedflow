import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/project';
import { MediaFile } from './typeorm/entities/media-file';
import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/user';
import { ConfigModule } from '@nestjs/config';
import { FeedbackStatusHistory } from './typeorm/entities/feedback-status-history';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hmJZKzJ&&rtYwq#ppB65',
      database: 'feedflow',
      autoLoadEntities: true,
      synchronize: true, // set to false in production!
      entities: [Project, Feedback, User],
    }),
    TypeOrmModule.forFeature([
      Project,
      User,
      Feedback,
      MediaFile,
      FeedbackStatusHistory,
    ]),

    ProjectsModule,

    UsersModule,

    AuthModule,

    FeedbackModule,
  ],
})
export class AppModule {}
