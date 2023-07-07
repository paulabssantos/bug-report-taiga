import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';
import { DatabaseModule } from './shared/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TaigaLoginMiddleware } from './shared/http/middlewares/taiga-login.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SystemModule } from './modules/system/system.module';
import { MailModule } from './modules/mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    isGlobal: true
  }),ConfigModule.forRoot({
    isGlobal: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: './uploads',
    serveRoot: '/uploads'
  }),
    DatabaseModule, ReportModule, SystemModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TaigaLoginMiddleware).forRoutes('report')
  }
}
