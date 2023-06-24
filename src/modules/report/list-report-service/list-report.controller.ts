import { Controller, Param, Post, Query } from '@nestjs/common';
import { ListReportService } from './list-report.service';

@Controller('report')
export class ListReportController {
    constructor(private listReportService: ListReportService) { }

    @Post('/:registration')
    async create(@Param('registration') email: string, @Query() data: {done: boolean}) {
        return await this.listReportService.execute(email, data.done)
    }
}
