import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";

export abstract class ReportRepository{
    abstract create(data: CreateReportDTO):Promise<void>
}