import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
// import { Request } from 'express';
import { SkipAuth } from './decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  @HttpCode(200)
  async login(@Body() credentials: LoginDTO) {
    return await this.authService.login(credentials);
  }

  @SkipAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('token')
  async refreshToken(@User(['sub', 'refreshToken']) user) {
    const userId = user[0].sub;
    const refreshToken = user[1].refreshToken;
    return await this.authService.refreshToken(userId, refreshToken);
  }

  @Get('logout')
  async logout(@User('sub') userId: number) {
    return await this.authService.logout(userId);
  }
}
