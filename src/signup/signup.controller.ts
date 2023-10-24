import { Controller, Post, Body } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseInterface } from './interfaces/sign-up.interfaces';
import { SkipAuth } from '../auth/decorators/auth.decorator';

@Controller('register')
export class SignupController {
  constructor(private signUpService: SignupService) {}

  @SkipAuth()
  @Post()
  async createUser(@Body() signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    try {
      const user = await this.signUpService.signUp({
        email,
        name,
        password,
      });
      const response: SignUpResponseInterface = {
        status: 'success',
        message: 'Sign up successfully',
        data: user,
      };

      return response;
    } catch (error) {
      if (error) throw error;
    }
  }
}
