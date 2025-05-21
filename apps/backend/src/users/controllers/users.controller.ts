import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../../typeorm/entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: Partial<User>): Promise<User> {
    if (!data.email) {
      throw new BadRequestException('Email is required');
    }
    return this.usersService.createUser(data);
  }

  @Get()
  async findUserByEmail(@Query('email') email: string): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email query param is required');
    }
    return this.usersService.findUserByEMail(email);
  }

  // ⚠️ For internal use only — avoid exposing passwords in public APIs
  @Get('with-password')
  async findUserWithPassword(
    @Query('email') email: string,
  ): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email query param is required');
    }
    return this.usersService.findUserByEMailwithPassword(email);
  }
}
