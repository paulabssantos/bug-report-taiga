import { Module } from '@nestjs/common';
import { CreateReportService } from './create-report-service/create-report.service';
import { CreateReportController } from './create-report-service/create-report.controller';

@Module({
  controllers: [CreateReportController],
  providers: [CreateReportService],
})
export class ReportModule {}
