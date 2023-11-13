import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from '../common/db/prisma.service';
import { AuthDto } from './dto';
import { JwtPayload, signupLocalType, Tokens } from './types';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {
  }

  async signupLocal(dto: AuthDto): Promise<signupLocalType> {
    const hash = await argon.hash(dto.password);
    const activationLink = Math.random().toString(36).substring(2);
    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          accessToken: hash,
          refreshToken: hash,
          name: dto.name,
          activationLink: activationLink,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });
    const tokens = await this.getTokens(user.name, user.email,user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);
    await this.emailService.sendConfirmationLink(user.email);
    return {
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
      isActive: user.isActive,
      email: user.email,
    };
  }

  async signinLocal(dto: AuthDto): Promise<signupLocalType> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    const passwordMatches = await argon.verify(user.accessToken, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.name, user.email,user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return {
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
      isActive: user.isActive,
      email: user.email,
    };
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    return true;
  }

  async refreshTokens(email: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const rtMatches = await argon.verify(user.refreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.name, user.email, user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async getTokens(name: string, email: string, id: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: id,
      email: email,
      name: name,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_JWT_ACCESS_TOKEN'),
        expiresIn: '360m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('SECRET_JWT_REFRESH_TOKEN'),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
