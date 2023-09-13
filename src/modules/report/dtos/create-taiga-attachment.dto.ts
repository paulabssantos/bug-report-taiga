import { ReadStream } from "fs";

export interface CreateTaigaAttachmentDTO{
    object_id: number,
    project: number,
    attached_file: ReadStream
}