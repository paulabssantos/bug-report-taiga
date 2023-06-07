import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportService } from './create-report.service';
import { CreateReportDTO } from '../dtos/create-report.dto';

@Controller('report')
export class CreateReportController {
    constructor(private createReportService: CreateReportService){}

    @Post()
    create(@Body() createReportDto: CreateReportDTO){
        return this.createReportService.execute(createReportDto)
    }
}
