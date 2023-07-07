import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendEmailReportService } from "./send-email-report/send-email-report.service"
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      transport: {
        host: config.get<string>('MAIL_HOST'),
        port: config.get<string>('MAIL_PORT'),
        secure: false,
        ignoreTLS: false,
        auth: {
          user:  config.get<string>('MAIL_USER'),
          pass:  config.get<string>('MAIL_PASSWORD')
        },
        defaults: {
          from:  config.get<string>('MAIL_USER'),
        },
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  })],
  providers: [SendEmailReportService],
  exports: [SendEmailReportService]
})
export class MailModule { }