import { ReadStream } from "fs";
import { taiga_instance } from "src/config/taiga-axios";
import { TaigaException } from "src/shared/errors/taiga-exception";

export interface CreateUserStoryDTO {
    description: string,
    project: number,
    subject: string,
    tags: Array<string>,
}

export interface CreateAttachmentDTO{
    object_id: number,
    project: number,
    attached_file: ReadStream
}

export const login = async() =>{
    return await taiga_instance.post('auth',{password: process.env.TAIGA_USER_PASSWORD, type: "normal", username: process.env.TAIGA_USER}).then((res)=>{
        return res.data
    })
}

export const refreshToken = async(token: string) =>{
    return await taiga_instance.post('auth/refresh',{refresh: token}).then((res)=>{
        return res.data
    })
}

export const createAttachment = async(attachment: CreateAttachmentDTO, token: string) =>{
    return await taiga_instance.post("userstories/attachments",attachment,{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
        }
})}

export const createUserStory = async (userStory: CreateUserStoryDTO, token: string) => {
    return await taiga_instance.post("userstories",userStory,{
        headers: {
            'Authorization': 'Bearer ' + token  
        }
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
    })
}

export const listUserStory = async (done: boolean, token: string) =>{
  return await taiga_instance.get(`userstories?project=${process.env.TAIGA_PROJECT}&is_closed=${done}`,{
    headers: {
        'Authorization': 'Bearer ' + token  
    }
}).then((res)=>{
        return res.data
    }).catch((err)=>{
    })
}
