import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { listUserStory } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/contracts/IReportRepository';

@Injectable()
export class ListReportService {
    constructor(private reportRepository: ReportRepository) { }
    async execute(email: string, token: string) {
        if (!email) {
            throw new HttpException('Email é obrigatório', HttpStatusCode.BadRequest)
        }
        try {
            let userReportsDone = []
            const userStoriesDone = await listUserStory(true, token)
            if (userStoriesDone.length > 0) {
                await userStoriesDone.find((userStory) => {
                    if (userStory.subject.split(']')[0].slice(1) == email.split('@')[0]) {
                        userReportsDone.push({ id: userStory.subject.split(']')[1].slice(1) })
                    }
                })
                await this.reportRepository.updateDone(userReportsDone)

            }
        } catch (error) {
        }
        const reports = await this.reportRepository.list(email)

        return reports
    }
}
