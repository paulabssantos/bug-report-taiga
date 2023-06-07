import { Module } from '@nestjs/common';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
