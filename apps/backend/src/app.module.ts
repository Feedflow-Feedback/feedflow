import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/project';

import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
      entities: [Project, Feedback],
    }),
    TypeOrmModule.forFeature([Project, Feedback]),

    ProjectsModule,

    UsersModule,

    AuthModule,
  ],
})
export class AppModule {}
