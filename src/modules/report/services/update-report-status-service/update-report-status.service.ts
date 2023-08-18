import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { listUserStory, login } from "src/shared/http/api/api-taiga";
import { ReportRepository } from "src/shared/infra/database/contracts/IReportRepository";
import {Cache} from "cache-manager"
import { SendEmailDoneReportService } from "src/modules/mail/services/send-email-done-report/send-email-done-report.service";
@Injectable()
export class UpdateReportStatusService {
    constructor(private sendEmailDoneReportService: SendEmailDoneReportService, private reportRepository: ReportRepository, @Inject(CACHE_MANAGER) private cacheManager: Cache){}

   @Cron(CronExpression.EVERY_30_MINUTES)
    async execute(){
        if(!await this.cacheManager.get('taiga-token')){
            const login_response = await login()
            await this.cacheManager.set('taiga-token', login_response.auth_token, 100000)
        }
        
        const token: string = await this.cacheManager.get('taiga-token')
        let userReportsDone = []
            const userStoriesDone = await listUserStory(true, token)
            if (userStoriesDone && userStoriesDone.length > 0) {
                await userStoriesDone.find((userStory) => {
                     userReportsDone.push({ id: userStory.subject.split(']')[1].slice(1) })
                })
                const updatedReports = await this.reportRepository.updateDone(userReportsDone)
                console.log(updatedReports)
               try {
                await this.sendEmailDoneReportService.execute(updatedReports)
               } catch (error) {
                console.log("Erro ao enviar e-mail de conclusão: ", error)
               }
            }
    }   
}