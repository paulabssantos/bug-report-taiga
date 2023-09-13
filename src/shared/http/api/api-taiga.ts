import { taiga_instance } from "src/config/taiga-axios";
import { CreateTaigaAttachmentDTO } from "src/modules/report/dtos/create-taiga-attachment.dto";
import { CreateTaigaIssueDTO } from "src/modules/report/dtos/create-taiga-issue.dto";


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

export const createAttachment = async(attachment: CreateTaigaAttachmentDTO, token: string) =>{
    return await taiga_instance.post("issues/attachments",attachment,{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
        }
})}

export const createIssue = async (issue: CreateTaigaIssueDTO, token: string) => {
    return await taiga_instance.post("issues",issue,{
        headers: {
            'Authorization': 'Bearer ' + token  
        }
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
    })
}

export const listIssues = async (done: boolean, token: string) =>{
  return await taiga_instance.get(`issues?project=${process.env.TAIGA_PROJECT}&status__is_closed=${done}`,{
    headers: {
        'Authorization': 'Bearer ' + token  
    }
}).then((res)=>{
        return res.data
    }).catch((err)=>{
    })
}
