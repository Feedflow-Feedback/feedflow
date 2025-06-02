import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../../typeorm/entities/user';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<Partial<User>> {
    if (!data.email || !data.password) {
      throw new BadRequestException('Email is required & password is required');
    }

    return this.usersService.createUser(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('getProjectIds')
  async getProjectIds(@Body() data) {
    if (!data.userId) {
      throw new BadRequestException('Email query param is required');
    }
    const user = await this.usersService.findUserByUserId(data.userId);
    const projectIds = user?.projects || [];
    return projectIds;
  }
}
