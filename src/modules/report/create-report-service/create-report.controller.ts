import { Body, Controller, Post, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { CreateReportService } from './create-report.service';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer';

@Controller('report')
export class CreateReportController {
    constructor(private createReportService: CreateReportService){}

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    create(@Request() req, @Body() createReportDto: CreateReportDTO, @UploadedFile() file: Express.Multer.File ){
        const token  = req.cookies['taiga-token']
        return this.createReportService.execute(createReportDto,file,token)
    }
}
