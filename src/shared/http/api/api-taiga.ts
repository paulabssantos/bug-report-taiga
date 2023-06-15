import { taiga_instance } from "src/config/taiga-axios";

export interface CreateUserStoryDTO {
    description: string,
    project: number,
    subject: string,
    tags: Array<string>,
}

export const createUserStory = async (userStory: CreateUserStoryDTO) => {
    const response = await taiga_instance.post("userstories",userStory)
    return response.data
}
