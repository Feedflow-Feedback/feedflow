import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';

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

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEMail(input.email);
    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        email: user.email,
      };
    }
    return null;
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
