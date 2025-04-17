import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';
import { Project } from './typeorm/entities/project';
import { Feedback } from './typeorm/entities/feedback';
import { MediaFile } from './typeorm/entities/media-file';
import { Admin } from 'typeorm';
import { IntegrationConfig } from './typeorm/entities/integration-config';
import { FeedbackStatusHistory } from './typeorm/entities/feedback-status-history';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hmJZKzJ&&rtYwq#ppB65',
      database: 'feedflow',
      autoLoadEntities: true,
      synchronize: true, // set to false in production!
      entities: [
        User,
        Project,
        Feedback,
        MediaFile,
        Admin,
        IntegrationConfig,
        FeedbackStatusHistory,
      ],
    }),
    TypeOrmModule.forFeature([
      Project,
      Feedback,
      MediaFile,
      Admin,
      IntegrationConfig,
      FeedbackStatusHistory,
      User,
    ]),
    UsersModule,
    ProjectsModule,
  ],
})
export class AppModule {}
