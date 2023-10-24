import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Sevice should be defined', () => {
    expect(userService).toBeDefined();
  });
});
