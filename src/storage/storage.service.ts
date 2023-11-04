import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/db/prisma.service';

@Injectable()
export class StorageService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(id: string) {
    const data = await this.prisma.storage.findMany({
      where: {
        userId: id,
      },
    });
    return data;
  }

  async getOne(id: string, storageId: string) {
    const data = await this.prisma.storage.findUnique({
      where: {
        id: storageId,
        userId: id,
      },
    });
    return data;
  }

  async create(id: string, data: any) {
    const storage = await this.prisma.storage.create({
      data: {
        ...data,
        user: {
          connect: {
            id,
          },
        },
      },
    });
    return storage;
  }

  async update(id: string, storageId: string, data: any) {
    const storage = await this.prisma.storage.update({
      where: {
        id: storageId,
        userId: id,
      },
      data,
    });
    return storage;
  }

  async delete(id: string, storageId: string) {
    const storage = await this.prisma.storage.delete({
      where: {
        id: storageId,
        userId: id,
      },
    });
    return storage;
  }

  async deleteAll(id: string) {
    const storage = await this.prisma.storage.deleteMany({
      where: {
        userId: id,
      },
    });
    return storage;
  }
}
