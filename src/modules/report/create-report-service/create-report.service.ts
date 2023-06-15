import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../dtos/create-report.dto';
import { CreateUserStoryDTO, createUserStory } from 'src/shared/http/api/api-taiga';

@Injectable()
export class CreateReportService {
    constructor(){}
    async execute(createReportDto: CreateReportDTO){
        const userStory: CreateUserStoryDTO = {
            description: `Nome: ${createReportDto.name}\nMatrícula: ${createReportDto.registration}\nDescrição do problema: ${createReportDto.description}\n`,
            project: 808519,
            subject: createReportDto.title,
            tags: [
                createReportDto.system,
            ]
        }
        await createUserStory(userStory).then((res)=>{
            console.log(res)
        })
    }
}
