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

export const listUserStory = async (done: boolean) =>{
    const response = await taiga_instance.get(`userstories?project=${process.env.TAIGA_PROJECT}&is_closed=${done}`)
    return response.data
}
