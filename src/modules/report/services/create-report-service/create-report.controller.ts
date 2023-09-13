import { Body, Controller, Post, UploadedFile, UseInterceptors, Request, Inject } from '@nestjs/common';
import { CreateReportService } from './create-report.service';
import { CreateReportDTO } from '../../dtos/create-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('report')
@Controller('report')
export class CreateReportController {
    constructor(private createReportService: CreateReportService, @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: "Cria report" })
    @ApiBody({ type: CreateReportDTO })
    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(@Body() { description, email, system, title }: Omit<CreateReportDTO,"file">, @UploadedFile() file : Express.Multer.File) {
        const token: string = await this.cacheManager.get('taiga-token')
        return this.createReportService.execute({ description, email, system, title }, file, token)
    }
}
