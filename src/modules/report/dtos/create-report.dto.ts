import { IsEmail, IsEmpty, IsString } from "class-validator"

export class CreateReportDTO{
    @IsEmpty({message: 'Email não pode ficar vazio'})
    @IsEmail()
    email: string

    @IsEmpty({message: 'Descrição não pode ficar vazio'})
    @IsString({message: 'Descrição precisa uma string'})
    description: string

    @IsEmpty({message: 'Sistema não pode ficar vazio'})
    @IsString({message: 'Sistema precisa uma string'})
    system: string
}