import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { CreateUserStoryDTO, createUserStory } from 'src/shared/http/api/api-taiga';
import { ReportRepository } from 'src/shared/infra/database/mongodb/repositories/IReportRepositoryInMongo';

@Injectable()
export class CreateReportService {
    constructor(private reportRepository: ReportRepository){}
    async execute(createReportDto: CreateReportDTO){
        const userStory: CreateUserStoryDTO = {
            description: `Nome: ${createReportDto.name}\nMatrícula: ${createReportDto.registration}\nDescrição do problema: ${createReportDto.description}\n`,
            project: 808519,
            subject: createReportDto.title,
            tags: [
                createReportDto.system,
            ]
        }
        await createUserStory(userStory).then(async (res)=>{
            const createReportInDatabase = Object.assign(createReportDto,{user_story_id: res.id})
            return await this.reportRepository.create(createReportInDatabase)
        })
    }
}
