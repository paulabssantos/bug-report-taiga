import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";
import { Report } from "../schemas/report.schema";

export abstract class ReportRepository{
    abstract create(data: CreateReportDTO):Promise<void>
    abstract list(email: string, done: boolean):Promise<Report[]>
    abstract updateDone(data: UpdateReportDTO): Promise<void>
}