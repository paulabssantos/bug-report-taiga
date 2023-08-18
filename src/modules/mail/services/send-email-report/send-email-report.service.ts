import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Report } from "../../../report/entities/report.entity"
import 'dotenv/config'

@Injectable()
export class SendEmailReportService {
    constructor(private mailer: MailerService) {}

    async execute(file: Express.Multer.File, report: Report){
        this.mailer.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: `Chamado [${report._id}][${report.system}]`,
            template: "reportCreation",
            attachments: [file],
            context: {
                id: report._id,
                title: report.title,
                email: report.email,
                system: report.system,
                description: report.description
            }

        })
    }
}