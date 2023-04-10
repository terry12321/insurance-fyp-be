import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetConfirmation(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      template: './confirmation',
      context: {
        url,
      },
    });
  }
}
