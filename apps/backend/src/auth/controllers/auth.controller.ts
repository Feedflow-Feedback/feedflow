import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    const result = this.authService.authenticate(input);

    if (!result) {
      throw new BadRequestException('Invalid credentials');
    }
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() input: { email: string; password: string }) {
    return this.authService.register(input);
  }
}
