import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../../dtos/create-report.dto';
import { createAttachment, createIssue } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/contracts/IReportRepository';
import { SendEmailReportService } from 'src/modules/mail/services/send-email-report/send-email-report.service';
import * as fs from 'fs'
import { CreateTaigaIssueDTO } from '../../dtos/create-taiga-issue.dto';
import { CreateTaigaAttachmentDTO } from '../../dtos/create-taiga-attachment.dto';

@Injectable()
export class CreateReportService {
    constructor(private reportRepository: ReportRepository, private sendEmailReport: SendEmailReportService) { }
    async execute({description,email,system,title }: Omit<CreateReportDTO,"file">, file : Express.Multer.File, token: string) {
        try {
            const createReportInDatabase = Object.assign({description, email, system, title, file}, { image_path: file ? file.path : null })
            await this.reportRepository.create(createReportInDatabase).then(async (res) => {
                const issue: CreateTaigaIssueDTO = {
                    description: `Email: ${email}\nDescrição do problema: ${description}\n`,
                    project: Number(process.env.TAIGA_PROJECT),
                    subject: `[${email.toString().split('@')[0]}][${res._id.toString()}] ${title}`,
                    tags: [
                        system,
                    ]
                }

                const CreatedIssue= await createIssue(issue, token)
                const attachment: CreateTaigaAttachmentDTO = {attached_file: fs.createReadStream(file.path), object_id: CreatedIssue.id, project: Number(process.env.TAIGA_PROJECT)}
                await createAttachment(attachment,token)
                await this.sendEmailReport.execute(file, res)

            })
        } catch (error) {
            console.log(error)
        }
    }
}
