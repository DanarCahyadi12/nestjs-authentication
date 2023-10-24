import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UserResult } from './types/user.type';

@Injectable()
export class SignupService {
  constructor(private userService: UserService) {}

  async signUp({ email, name, password }: SignUpDto): Promise<UserResult> {
    return new Promise<UserResult>(async (resolve, reject) => {
      const user = await this.userService.findOneByEmail(email);
      if (user) {
        return reject(new BadRequestException('Email already registered'));
      }

      if (password.length < 8) {
        return reject(
          new BadRequestException(
            'Minimum password length must be 8 characters',
          ),
        );
      }
      const userCreated = await this.userService.create({
        email,
        name,
        password,
      });
      resolve(userCreated);
    });
  }
}
