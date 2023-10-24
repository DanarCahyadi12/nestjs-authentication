import { Controller, Get } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { UserPayloadInterface } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  @Get()
  getUser(@User() user: UserPayloadInterface) {
    return user;
  }
}
