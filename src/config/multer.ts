import * as multer from "multer"
import * as crypto from 'crypto'
export const multerConfig = {
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