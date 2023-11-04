import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id?: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  activationLink?: string;
  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
