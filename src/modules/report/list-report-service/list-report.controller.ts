import { Controller, Get, Inject, Param, Request } from '@nestjs/common';
import { ListReportService } from './list-report.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"

@Controller('report')
export class ListReportController {
    constructor(private listReportService: ListReportService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @Get('/:email')
    async create(@Request() req, @Param('email') email: string) {
        const token: string = await this.cacheManager.get('taiga-token')
        return await this.listReportService.execute(email, token)
    }
}
