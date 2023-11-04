import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../common/db/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
