import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from '../db/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const decoded = await this.jwtService.verify(token, { secret: process.env.SECRET_JWT_ACCESS_TOKEN });
      const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const passwordValid = await argon.verify(user.accessToken, decoded.accessToken);
      if (!passwordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      req.body.user = user;
      next();
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}