import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { CreateUserStoryDTO, createUserStory } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/contracts/IReportRepository';
import { SendEmailReportService } from 'src/modules/mail/send-email-report/send-email-report.service';

@Injectable()
export class CreateReportService {
    constructor(private reportRepository: ReportRepository, private sendEmailReport: SendEmailReportService) { }
    async execute(createReportDto: CreateReportDTO, file: Express.Multer.File, token: string) {

        try {
            const createReportInDatabase = Object.assign(createReportDto, { image_path: file ? file.path : null })
            await this.reportRepository.create(createReportInDatabase).then(async (res) => {
                const userStory: CreateUserStoryDTO = {
                    description: `Email: ${createReportDto.email}\nDescrição do problema: ${createReportDto.description}\n`,
                    project: Number(process.env.TAIGA_PROJECT),
                    subject: `[${createReportDto.email.toString().split('@')[0]}][${res._id.toString()}] ${createReportDto.title}`,
                    tags: [
                        createReportDto.system,
                    ]
                }

                await createUserStory(userStory, token)
                await this.sendEmailReport.execute(file, res)

            })
        } catch (error) {
            console.log(error)
        }
    }
}
