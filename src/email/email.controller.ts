import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { GetParamEmail } from '../common/decorators';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('get-confirmation-link')
  async sendConfirmationEmail(@Query() emailQuery:{
    email: string;
  }): Promise<void> {
    return await this.emailService.sendConfirmationLink(emailQuery.email);
  }

  @Get('confirm-email')
  @Redirect('email-frontend', 302)
  async confirmEmail(@Query('token') token: string): Promise<void> {
    await this.emailService.checkEmailIsVerified(token);
  }

  @Get('is-confirmed')
  async isEmailConfirmed(@Query() emailQuery:{ email: string; }): Promise<boolean> {
    return await this.emailService.isEmailConfirmed(emailQuery.email);
  }
}
