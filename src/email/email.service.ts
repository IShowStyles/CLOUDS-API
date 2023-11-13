import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../common/db/prisma.service';
import * as process from 'process';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly prisma: PrismaService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
  }

  async sendVerificationLink(email: string, verificationLink: string) {
    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  // auth module
  async sendConfirmationLink(userEmail: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    await this.prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        activationLink: user.activationLink,
      },
    });
    const confirmationLink = `${process.env.DOMAIN}/api/email/confirm-email?token=${user.activationLink}`;
    await this.sendVerificationLink(userEmail, confirmationLink);
  }

  async isEmailConfirmed(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.isActive;
  }

  async checkEmailIsVerified(idToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        activationLink: idToken,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
      },
    });
  }
}
