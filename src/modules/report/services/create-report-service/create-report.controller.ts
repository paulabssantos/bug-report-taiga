import { Body, Controller, Post, UploadedFile, UseInterceptors, Request, Inject } from '@nestjs/common';
import { CreateReportService } from './create-report.service';
import { CreateReportDTO } from '../../dtos/create-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('report')
export class CreateReportController {
    constructor(private createReportService: CreateReportService,@Inject(CACHE_MANAGER) private cacheManager: Cache){}

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(@Request() req, @Body() createReportDto: CreateReportDTO, @UploadedFile() file: Express.Multer.File ){
        const token: string  = await this.cacheManager.get('taiga-token')
        return this.createReportService.execute(createReportDto,file,token)
    }
}
