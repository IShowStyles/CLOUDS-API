import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../common/db/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        activationLink: data.activationLink,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return user;
  }

  async isActive(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user.isActive;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new ConflictException('User with this id does not exist');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ConflictException('User with this email does not exist');
    }
    return user;
  }

  async update(id: string, data: Partial<UserDto>): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const data = await this.prisma.user.delete({ where: { id } });
    return data;
  }
}
