import { Controller } from '@nestjs/common';
import { CreateReportService } from './create-report.service';

@Controller('report')
export class CreateReportController {
    constructor(private createReportService: CreateReportService){}

}
