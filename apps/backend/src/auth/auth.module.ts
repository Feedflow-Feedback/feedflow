import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:
        '9f733ede1dccf195ff72b87cb1a8f9bb4b75c58ecd3e24f88e0aeac51cc145f33a08aa5c209d4c779c538c70b575f3ab7bc60e1b2080ffdf97aba457266a912f1eb6941a35c4a09ed34b2b273a261dd4d7e259c8d5fbeb850e6cd8b0e4c100ec739de44a566a207adb8d656d2c1dc119aa5cf3532080cf3ba01be5cbde147e142264511d0960fc8e34c4e54c42ad9ab9e5e39a4d5f1693716e973d329ca1adea65ba95961b937526cbf481f7b1710595aa796c3e508a359bd1f283601da21193690a31da2dc7e10c3520941a8166c5129ccf94fe698cb2b9b6d2e3558018610a1e12a659748911c94624f3ecb9da5f6e5148b90e17fbb428bada37532921daf9c4bca8c66d3345db1fd099c1a9a8cd193fa5826b302a61425308b49ca3e4a2eec4a68cff85c0981e330b3d3db5983f0ebf659907ee0a25ffa4bd9dbaa8303ee4', // Use a strong secret key
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
