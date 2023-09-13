import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { listIssues } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/contracts/IReportRepository';
import { UpdateReportDTO } from '../../dtos/update-report.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class ListReportService {
    constructor(private reportRepository: ReportRepository) { }
    async execute(email: string, token: string) {
        if (!email) {
            throw new HttpException('Email é obrigatório', HttpStatusCode.BadRequest)
        }
        try {
            let userReportsDone: UpdateReportDTO[] = []
            const issuesDone = await listIssues(true, token)
            if (issuesDone && issuesDone.length > 0) {
                await issuesDone.find((issue) => {
                    if (issue.subject.split(']')[0].slice(1) == email.split('@')[0]) {
                        userReportsDone.push({ id: issue.subject.split(']')[1].slice(1), finished_date: issue.finished_date})
                    }
                })
                await this.reportRepository.updateDone(userReportsDone)

            }
        } catch (error) {
            console.log(error)
        }
        const reports = await this.reportRepository.list(email)

        return reports
    }
}
