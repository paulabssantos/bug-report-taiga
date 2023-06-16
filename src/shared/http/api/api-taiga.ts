import { taiga_instance } from "src/config/taiga-axios";
import { TaigaException } from "src/shared/errors/taiga-exception";

export interface CreateUserStoryDTO {
    description: string,
    project: number,
    subject: string,
    tags: Array<string>,
}

export const createUserStory = async (userStory: CreateUserStoryDTO) => {
    return await taiga_instance.post("userstories",userStory).then((res)=>{
        return res.data
    }).catch((err)=>{
        throw new TaigaException(err.response.status,err.response.statusText)
    })
}

export const listUserStory = async (done: boolean) =>{
  return await taiga_instance.get(`userstories?project=${process.env.TAIGA_PROJECT}&is_closed=${done}`).then((res)=>{
        return res.data
    }).catch((err)=>{
        throw new TaigaException(err.response.status,err.response.statusText)
    })
}
