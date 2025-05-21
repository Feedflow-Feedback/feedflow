import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';

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
  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() data) {
    return this.projectsService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
