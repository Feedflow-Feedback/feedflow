import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

const JWT_SECRET = process.env.JWT_SECRET || '';
console.log('JWT_SECRET:', JWT_SECRET); // Log the secret for debugging
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET, // Use a strong secret key
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
  ],
})
export class AuthModule {}
