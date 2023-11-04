import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/db/prisma.service';

@Injectable()
export class StorageItemService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(id: string) {
    const data = await this.prisma.storageItem.findMany({
      where: {
        storageId: id,
      },
    });
    return data;
  }

  async getOne(id: string, storageItemId: string) {
    const data = await this.prisma.storageItem.findUnique({
      where: {
        id: storageItemId,
        storageId: id,
      },
    });
    return data;
  }

  async create(id: string, storageId: string, data: any) {
    const storageItem = await this.prisma.storageItem.create({
      data: {
        ...data,
        storage: {
          connect: {
            id: storageId,
          },
        },
      },
    });
    return storageItem;
  }

  async update(id: string, storageItemId: string, data: any) {
    const storageItem = await this.prisma.storageItem.update({
      where: {
        id: storageItemId,
        storageId: id,
      },
      data,
    });
    return storageItem;
  }

  async delete(id: string, storageItemId: string) {
    const storageItem = await this.prisma.storageItem.delete({
      where: {
        id: storageItemId,
        storageId: id,
      },
    });
    return storageItem;
  }

  async deleteAll(id: string) {
    const storageItem = await this.prisma.storageItem.deleteMany({
      where: {
        storageId: id,
      },
    });
    return storageItem;
  }
}
