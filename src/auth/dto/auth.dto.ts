import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  id?: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
