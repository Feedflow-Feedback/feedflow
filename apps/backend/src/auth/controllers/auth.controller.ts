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
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    return this.authService.authenticate(input);
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
