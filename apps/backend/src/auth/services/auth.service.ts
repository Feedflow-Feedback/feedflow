import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

import { User } from 'src/typeorm/entities/user';

type AuthInput = {
  email: string;
  password: string;
};
type SignInData = {
  userId: string;
  email: string;
};
type AuthResult = {
  accessToken: string;
  userId: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult | null> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signIn(user);
  }

  async register(input: AuthInput): Promise<Partial<User>> {
    const existingUser = await this.usersService.findUserByEMail(input.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.createUser({
      email: input.email,
      password: await this.hashPassword(input.password),
    });

    return newUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEMailwithPassword(
      input.email,
    );
    if (user) {
      const passwordMatch = await bcrypt.compare(input.password, user.password);
      if (passwordMatch) {
        return {
          userId: user.userId,
          email: user.email,
        };
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }
  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = { userId: user.userId, email: user.email };
    const accessToken = await this.jwtService.sign(tokenPayload);
    return {
      accessToken,
      userId: user.userId,
      email: user.email,
    };
  }
}
