import { HttpException } from "@nestjs/common";

export class TaigaException extends HttpException {
    constructor(status: number, statusText: string){
        super(`TaigaException: ${statusText}`,status);
    }
}