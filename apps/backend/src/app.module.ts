import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/project';

import { ProjectsModule } from './projects/projects.module';
import { Feedback } from './typeorm/entities/feedback';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/user';

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
      entities: [Project, Feedback, User],
    }),
    TypeOrmModule.forFeature([Project, User]),

    ProjectsModule,

    UsersModule,

    AuthModule,
  ],
})
export class AppModule {}
