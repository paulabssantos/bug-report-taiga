import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../dtos/create-report.dto';

@Injectable()
export class CreateReportService {
    async execute(createReportDto: CreateReportDTO){
        console.log("Cria report")
    }
}
