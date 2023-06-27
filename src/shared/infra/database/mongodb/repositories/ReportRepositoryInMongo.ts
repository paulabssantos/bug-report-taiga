import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { ReportRepository } from "./IReportRepositoryInMongo";
import { InjectModel } from "@nestjs/mongoose";
import { Report } from "../schemas/report.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";

@Injectable()
export class ReportRepositoryInMongo implements ReportRepository{
    constructor(@InjectModel(Report.name) private reportModel: Model<Report>){}
    async list(email: string): Promise<Report[]> {
        return await this.reportModel.find({email},{},{sort: {date: 'desc'}})
    }
    async updateDone(data: UpdateReportDTO): Promise<void> {
        await this.reportModel.updateMany({user_story_id: data.id, done: false},{$set: {done: data.done}})
    }
    async create(data: CreateReportDTO): Promise<void> {
        const createdReport = new this.reportModel(data)
        await createdReport.save()
    }
    
}