import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './contollers/projects.controller';
import { Project } from 'src/typeorm/entities/project';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
