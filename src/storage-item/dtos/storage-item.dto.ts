import { IsString, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class StorageItemDto {
  @IsUUID()
  @IsOptional()
  id?: string;
  @IsString()
  name: string;
  @IsString()
  base64Content: string;
  @IsUUID()
  storageId: string;
}
