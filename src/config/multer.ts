import * as multer from "multer"
import * as crypto from 'crypto'
import { HttpException, HttpStatus } from "@nestjs/common"
export const multerConfig = {
    limits: {
        fileSize: 1024 * 1024 * 2, 
      },
    fileFilter(req,file,callback){
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        }
        else {
            callback(new HttpException('Formato de arquivo precisa ser uma imagem', HttpStatus.BAD_REQUEST), false)
        }
        if(file.size > 1024 * 1024 * 2){
            callback(new HttpException('Imagem deve ter no máximo 2MB', HttpStatus.BAD_REQUEST), false)
        }else{
            callback(null, true)
        }
    },
    dest: './uploads',
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, "./uploads")
        },
        filename(req, file, callback) {
            crypto.randomBytes(16, (err, hash) => {
                callback(null, `${hash.toString('hex')}-${file.originalname}`)
            })
        },
    })
}