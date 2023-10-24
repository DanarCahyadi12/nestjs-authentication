import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, email, password }: CreateUserDto) {
    const user: UserEntity = await this.prisma.user.create({
      data: { name: name, email: email, password: password },
    });
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email },
      select: { id: true, email: true, name: true },
    });
  }

  async findOneByEmailAndPassword(email: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: {
          email: email,
          password: password,
        },
      },
    });
  }

  async updateTokenUser(id: number, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: refreshToken,
      },
      select: {
        id: true,
        email: true,
        refreshToken: true,
      },
    });
  }

  async findUserByRefreshToken(refreshToken: string) {
    return await this.prisma.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
        refreshToken: true,
      },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        refreshToken: true,
        email: true,
      },
    });
  }
}
