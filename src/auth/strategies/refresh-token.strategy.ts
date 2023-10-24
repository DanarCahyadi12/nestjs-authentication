import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'supertest';
import { UserPayloadInterface } from '../interfaces/login.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_REFRESH_TOKEN,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserPayloadInterface) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
