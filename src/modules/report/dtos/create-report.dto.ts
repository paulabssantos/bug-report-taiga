import { IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateReportDTO{
    @IsNotEmpty({message: 'Nome não pode ficar vazio'})
    @IsString({message: 'Nome precisa uma string'})
    name: string

    @IsNotEmpty({message: 'Matricula não pode ficar vazio'})
    @IsInt({message: 'Matricula precisa um número'})
    registration: number

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

    user_story_id?: number;
}