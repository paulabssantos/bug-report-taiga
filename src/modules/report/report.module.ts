import { Module } from '@nestjs/common';
import { CreateReportService } from './services/create-report-service/create-report.service';
import { CreateReportController } from './services/create-report-service/create-report.controller';
import { ListReportController } from './services/list-report-service/list-report.controller';
import { ListReportService } from './services/list-report-service/list-report.service';
import { MailModule } from '../mail/mail.module';
import { UpdateReportStatusService } from './services/update-report-status-service/update-report-status.service';

@Module({
  imports:[MailModule],
  controllers: [CreateReportController,ListReportController],
  providers: [CreateReportService,ListReportService, UpdateReportStatusService],
})
export class ReportModule {}
