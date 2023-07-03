import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateReportDTO{

    @IsNotEmpty({message: 'Email não pode ficar vazio'})
    @IsEmail({},{message: 'Email precisa válido'})
    email: number

    @IsNotEmpty({message: 'Título não pode ficar vazio'})
    @IsString({message: 'Título precisa uma string'})
    @Length(1,50,{message: 'Título precisa ter no máximo 50 caracteres'})
    title: string

    @IsNotEmpty({message: 'Descrição não pode ficar vazio'})
    @IsString({message: 'Descrição precisa uma string'})
    description: string

    @IsNotEmpty({message: 'Sistema não pode ficar vazio'})
    @IsString({message: 'Sistema precisa uma string'})
    system: string
}