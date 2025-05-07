import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/project';

import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';

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
      synchronize: false, // set to false in production!
      entities: [Project, Feedback],
    }),
    TypeOrmModule.forFeature([Project, Feedback]),

    ProjectsModule,
  ],
})
export class AppModule {}
