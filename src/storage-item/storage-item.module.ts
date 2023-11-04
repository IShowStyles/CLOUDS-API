import { Module } from '@nestjs/common';
import { StorageItemController } from './storage-item.controller';
import { StorageItemService } from './storage-item.service';
import { PrismaService } from '../common/db/prisma.service';

@Module({
  controllers: [StorageItemController],
  providers: [StorageItemService, PrismaService],
})
export class StorageItemModule {}
