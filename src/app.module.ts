import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    SignupModule,
    AuthModule,
  ],
})
export class AppModule {}
