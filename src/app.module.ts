import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';
import { DatabaseModule } from './shared/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TaigaLoginMiddleware } from './shared/http/middlewares/taiga-login.middleware';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(TaigaLoginMiddleware).forRoutes('report')
  }
}
