import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Request } from 'express';
import { SkipAuth } from './decorators/auth.decorator';

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
  async refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshToken(userId, refreshToken);
  }
}
