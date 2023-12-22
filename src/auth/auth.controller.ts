import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { signupLocalType, Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<signupLocalType> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto): Promise<signupLocalType> {
    return await this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body('email') email: string): Promise<boolean> {
    return await this.authService.logout(email);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Body('email') email: string,
    @Body('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return await this.authService.refreshTokens(email, refreshToken);
  }
}
