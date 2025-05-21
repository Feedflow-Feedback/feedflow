import {
  Controller,
  HttpStatus,
  NotImplementedException,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    const result = this.authService.authenticate(input);

    if (!result) {
      // console.log('result', result);
      throw new BadRequestException('Invalid credentials');
    }
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() input: { email: string; password: string }) {
    return this.authService.register(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}
