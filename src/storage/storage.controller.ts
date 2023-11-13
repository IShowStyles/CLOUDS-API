import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageDto } from './dtos/storage.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get(':id')
  async getAll(@Param('id') id: string) {
    return this.storageService.getAll(id);
  }

  @Get(':id/:storageId')
  async getOne(@Param('id') id: string, @Param('storageId') storageId: string) {
    return this.storageService.getOne(id, storageId);
  }

  @Post(':id')
  async create(@Param('id') id: string, @Body() data: StorageDto) {
    return this.storageService.create(id, data);
  }

  @Put(':id/:storageId')
  async update(
    @Param('id') id: string,
    @Param('storageId') storageId: string,
    @Body() data: StorageDto,
  ) {
    return this.storageService.update(id, storageId, data);
  }

  @Delete(':id/:storageId')
  async delete(@Param('id') id: string, @Param('storageId') storageId: string) {
    return this.storageService.delete(id, storageId);
  }

  @Delete(':id')
  async deleteAll(@Param('id') id: string) {
    return this.storageService.deleteAll(id);
  }
}
