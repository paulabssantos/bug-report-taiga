import { Module } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';
import { DatabaseModule } from './shared/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), DatabaseModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
