import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { ReportRepository } from "./IReportRepositoryInMongo";
import { InjectModel } from "@nestjs/mongoose";
import { Report } from "../schemas/report.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReportRepositoryInMongo implements ReportRepository{
    constructor(@InjectModel(Report.name) private reportModel: Model<Report>){}
    async create(data: CreateReportDTO): Promise<void> {
        const createdCat = new this.reportModel(data)
        await createdCat.save()
    }
    
}