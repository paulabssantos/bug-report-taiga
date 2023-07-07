import { Module } from '@nestjs/common';
import { CreateReportService } from './create-report-service/create-report.service';
import { CreateReportController } from './create-report-service/create-report.controller';
import { ListReportController } from './list-report-service/list-report.controller';
import { ListReportService } from './list-report-service/list-report.service';
import { MailModule } from '../mail/mail.module';
import { UpdateReportStatusService } from './update-report-status-service/update-report-status.service';

@Module({
  imports:[MailModule],
  controllers: [CreateReportController,ListReportController],
  providers: [CreateReportService,ListReportService, UpdateReportStatusService],
})
export class ReportModule {}
