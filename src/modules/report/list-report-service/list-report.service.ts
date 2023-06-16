import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { listUserStory } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/mongodb/repositories/IReportRepositoryInMongo';

@Injectable()
export class ListReportService {
    constructor(private reportRepository: ReportRepository) { }
    async execute(registration: number, done: boolean) {
        if(!registration || !done){
            throw new HttpException('Matrícula e status de reports é obrigatório',HttpStatusCode.BadRequest)
        }
        let userReportsDone = []
        const userStoriesDone = await listUserStory(true)
        await userStoriesDone.find((userStory)=>{
            if(userStory.subject.split(']')[0].slice(1) == registration){
                userReportsDone.push({done: userStory.is_closed, id: userStory.id})
            } 
        })
        userReportsDone.forEach(async (userReportDone)=>{
                await this.reportRepository.updateDone(userReportDone)
        })

        const reports = await this.reportRepository.list(registration,done)

        return reports
    }
}
