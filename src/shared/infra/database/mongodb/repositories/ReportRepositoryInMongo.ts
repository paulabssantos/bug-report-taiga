import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { ReportRepository } from "../../contracts/IReportRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Report } from "../../../../../modules/report/entities/report.entity";
import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";

@Injectable()
export class ReportRepositoryInMongo implements ReportRepository {
    constructor(@InjectModel(Report.name) private reportModel: Model<Report>) { }
    async list(email: string): Promise<Report[]> {
        return await this.reportModel.find({ email }, {}, { sort: { date: 'desc' } })
    }
    async updateDone(data: UpdateReportDTO[]): Promise<void> {
        await this.reportModel.updateMany(
            { _id: { $in: data.map(item => Types.ObjectId.createFromHexString(item.id)) }, done: false },
            { $set: { done: true } }
        );
    }
    async create(data: CreateReportDTO): Promise<Report & { _id: Types.ObjectId }> {
        const createdReport = new this.reportModel(data)
        await createdReport.save()
        return createdReport
    }
    
}