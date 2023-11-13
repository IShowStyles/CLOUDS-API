import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class StorageDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isEmpty: boolean;

  @IsBoolean()
  isShared: boolean;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
