import { CreateReportDTO } from "src/modules/report/dtos/create-report.dto";
import { ReportRepository } from "../../contracts/IReportRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Report } from "../../../../../modules/report/entities/report.entity";
import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UpdateReportDTO } from "src/modules/report/dtos/update-report.dto";
import * as dayjs from "dayjs";

@Injectable()
export class ReportRepositoryInMongo implements ReportRepository {
    constructor(@InjectModel(Report.name) private reportModel: Model<Report>) { }
    async list(email: string): Promise<Report[]> {
        return await this.reportModel.find({ email }, {}, { sort: { date: 'desc' } })
    }
    async updateDone(data: UpdateReportDTO[]): Promise<Report[]> {
        data.map(async item => {
            await this.reportModel.updateMany(
                {_id: Types.ObjectId.createFromHexString(item.id),done: false},
                {$set: {done: true, updated_at: dayjs(item.finished_date).format('YYYY-MM-DDTHH:mm:ss-00:00')}}
                
                )
        })
        const updatedReports = await this.reportModel.find({ _id: { $in: data.map(item => Types.ObjectId.createFromHexString(item.id)) }, done: true, updated_at:  { $gte: dayjs(dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')), $lt: dayjs(dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')).add(30,"minute")}})
        return updatedReports
    }
    async create(data: CreateReportDTO): Promise<Report> {
        const createdReport = new this.reportModel(data)
        await createdReport.save()
        return createdReport
    }
    
}