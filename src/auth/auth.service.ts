import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import {
  LoginResponseInterface,
  RefreshTokenInterface,
} from './interfaces/login.interface';
import { UserPayloadInterface } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { LogoutInterface } from './interfaces/logout.interface';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginDTO): Promise<LoginResponseInterface> {
    const { email, password } = credentials;
    const user = await this.userService.findOneByEmailAndPassword(
      email,
      password,
    );
    if (!user) throw new BadRequestException('Email or password incorrect');
    const refreshToken = await this.generateRefreshToken({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, this.saltRounds);
    const accessToken = await this.generateAccessToken({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    await this.userService.updateTokenUser(user.id, hashedRefreshToken);
    const response: LoginResponseInterface = {
      status: 'success',
      message: 'Login successfully',
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    };
    return response;
  }

  private async generateRefreshToken(
    payload: UserPayloadInterface,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY_REFRESH_TOKEN,
    });
  }
  private async generateAccessToken(
    payload: UserPayloadInterface,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY_ACCESS_TOKEN,
      expiresIn: '20s',
    });
  }

  async refreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<RefreshTokenInterface> {
    const user = await this.userService.findUserById(userId);
    if (!user || !user.refreshToken) throw new UnauthorizedException();
    const isValidRefreshToken = bcrypt.compareSync(
      refreshToken,
      user.refreshToken,
    );
    if (!isValidRefreshToken)
      throw new UnauthorizedException('Token invalid memek!');

    const accessToken = await this.generateAccessToken({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    return {
      status: 'success',
      message: 'Get access token successfully',
      data: {
        accessToken: accessToken,
      },
    };
  }

  async logout(idUser: number): Promise<LogoutInterface> {
    try {
      await this.userService.updateTokenUser(idUser, null);
      return {
        status: 'success',
        message: 'Logout successfully',
      };
    } catch (error) {
      if (error) throw error;
    }
  }
}
