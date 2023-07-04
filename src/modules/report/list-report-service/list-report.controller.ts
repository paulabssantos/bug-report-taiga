import { Controller, Get, Param, Request } from '@nestjs/common';
import { ListReportService } from './list-report.service';

@Controller('report')
export class ListReportController {
    constructor(private listReportService: ListReportService) { }

    @Get('/:email')
    async create(@Request() req, @Param('email') email: string) {
        const token = req.cookies['taiga-token']
        return await this.listReportService.execute(email, token)
    }
}
