import { Controller, Param, Post, Query, Request } from '@nestjs/common';
import { ListReportService } from './list-report.service';

@Controller('report')
export class ListReportController {
    constructor(private listReportService: ListReportService) { }

    @Post('/:email')
    async create(@Request() req, @Param('email') email: string, @Query() data: {done: boolean}) {
        const token = req.headers['taiga-token']
        return await this.listReportService.execute(email, data.done, token)
    }
}
