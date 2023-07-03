import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";
import { Report } from "../schemas/report.schema";
import { Types } from "mongoose";

export abstract class ReportRepository{
    abstract create(data: CreateReportDTO):Promise<Report & {_id: Types.ObjectId}>
    abstract list(email: string):Promise<Report[]>
    abstract updateDone(data:  UpdateReportDTO[]): Promise<void>
}