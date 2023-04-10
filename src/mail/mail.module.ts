import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SEND_GRID_HOST'),
          secure: false,
          port: 25,
          auth: {
            user: config.get('SEND_GRID_USER'),
            pass: config.get('SEND_GRID_PASS'),
          },
        },
        defaults: {
          from: config.get('SEND_GRID_FROM_EMAIL'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
