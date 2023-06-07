import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateReportDTO{
    @IsNotEmpty({message: 'Nome não pode ficar vazio'})
    @IsString({message: 'Nome precisa uma string'})
    name: string

    @IsNotEmpty({message: 'Matricula não pode ficar vazio'})
    @IsInt({message: 'Matricula precisa um número'})
    registration: number

    @IsNotEmpty({message: 'Email não pode ficar vazio'})
    @IsEmail()
    email: string

    @IsNotEmpty({message: 'Descrição não pode ficar vazio'})
    @IsString({message: 'Descrição precisa uma string'})
    description: string

    @IsNotEmpty({message: 'Sistema não pode ficar vazio'})
    @IsString({message: 'Sistema precisa uma string'})
    system: string
}