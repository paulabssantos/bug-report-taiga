import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Report } from "../../report/entities/report.entity"
import 'dotenv/config'

@Injectable()
export class SendEmailDoneReportService {
    constructor(private mailer: MailerService) {}

    async execute(reports: Report[]){
        console.log(reports)
        reports.forEach((report)=>{
            this.mailer.sendMail({
                from: process.env.MAIL_USER,
                to: report.email,
                subject: `Chamado [${report._id}][${report.system}]`,
                template: "reportFinished",
                context: {
                    id: report._id,
                    title: report.title,
                    system: report.system,
                }
            })
        })
    }
}