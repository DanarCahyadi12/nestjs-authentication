import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAcessAuthGuard } from './guards/jwt-access-auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      signOptions: { expiresIn: '5s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAcessAuthGuard,
    },
  ],
  exports: [JwtService, AccessTokenStrategy],
})
export class AuthModule {}
