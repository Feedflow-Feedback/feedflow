import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';

import { AuthGuard } from './../../auth/guards/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() data) {
    return this.projectsService.create(data);
  }

  @Post('getMyProjects')
  getMyProjects(@Body() data) {
    return this.projectsService.findAllByIds(data.projectIds);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
