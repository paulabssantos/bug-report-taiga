import { Controller, Param, Post, Query } from '@nestjs/common';
import { ListReportService } from './list-report.service';

@Controller('report')
export class ListReportController {
    constructor(private listReportService: ListReportService) { }

    @Post('/:registration')
    async create(@Param('registration') registration: string, @Query() data: {done: boolean}) {
        return await this.listReportService.execute(Number(registration), data.done)
    }
}
