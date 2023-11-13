import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StorageItemService } from './storage-item.service';
import { StorageItemDto } from './dtos/storage-item.dto';

@Controller('storage-item')
export class StorageItemController {
  constructor(private readonly storageItemService: StorageItemService) {}

  @Get(':id')
  async getAll(@Param('id') id: string) {
    return this.storageItemService.getAll(id);
  }

  @Get(':id/:storageItemId')
  async getOne(
    @Param('id') id: string,
    @Param('storageItemId') storageItemId: string,
  ) {
    return this.storageItemService.getOne(id, storageItemId);
  }

  @Post(':id/:storageId')
  async create(
    @Param('id') id: string,
    @Param('storageId') storageId: string,
    @Body() data: StorageItemDto,
  ) {
    return this.storageItemService.create(id, storageId, data);
  }

  @Put(':id/:storageItemId')
  async update(
    @Param('id') id: string,
    @Param('storageItemId') storageItemId: string,
    @Body() data: StorageItemDto,
  ) {
    return this.storageItemService.update(id, storageItemId, data);
  }

  @Delete(':id/:storageItemId')
  async delete(
    @Param('id') id: string,
    @Param('storageItemId') storageItemId: string,
  ) {
    return this.storageItemService.delete(id, storageItemId);
  }

  @Delete(':id')
  async deleteAll(@Param('id') id: string) {
    return this.storageItemService.deleteAll(id);
  }
}
