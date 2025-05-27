import {
  Controller,
  Post,
  Param,
  Body,
  Delete,
  HttpStatus,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from './../../auth/guards/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() data) {
    return this.projectsService.create(data);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('getMyProjects')
  getMyProjects(@Body() userId: { userId: string }) {
    const projects = this.projectsService.findAllUserProjects(userId.userId);

    return projects;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('getProjectDetails')
  getProjectDetails(@Body() data) {
    return this.projectsService.findOne(data.projectId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateProject(
    @Param('id') id: string,
    @Body() updateData: { name?: string; url?: string; description?: string },
  ) {
    return this.projectsService.update(id, updateData);
  }
}
