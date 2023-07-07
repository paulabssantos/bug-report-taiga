import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";
import { Report } from "../../../../modules/report/entities/report.entity";

export abstract class ReportRepository{
    abstract create(data: CreateReportDTO):Promise<Report>
    abstract list(email: string):Promise<Report[]>
    abstract updateDone(data:  UpdateReportDTO[]): Promise<Report[]>
}