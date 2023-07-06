import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';
import { DatabaseModule } from './shared/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TaigaLoginMiddleware } from './shared/http/middlewares/taiga-login.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SystemModule } from './modules/system/system.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: './uploads',
    serveRoot: '/uploads'
  }),
    DatabaseModule, ReportModule, SystemModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TaigaLoginMiddleware).forRoutes('report')
  }
}
