import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateReportDTO{

    @ApiProperty({description: "E-mail do solicitante"})
    @IsNotEmpty({message: 'Email não pode ficar vazio'})
    @IsEmail({},{message: 'Email precisa válido'})
    email: string

    @ApiProperty({description: "Título do problema"})
    @IsNotEmpty({message: 'Título não pode ficar vazio'})
    @IsString({message: 'Título precisa uma string'})
    @Length(1,50,{message: 'Título precisa ter no máximo 50 caracteres'})
    title: string

    @ApiProperty({description: "Descrição do problema"})
    @IsNotEmpty({message: 'Descrição não pode ficar vazio'})
    @IsString({message: 'Descrição precisa uma string'})
    description: string

    @ApiProperty({description: "Sistema de origem do problema"})
    @IsNotEmpty({message: 'Sistema não pode ficar vazio'})
    @IsString({message: 'Sistema precisa uma string'})
    system: string

    @ApiProperty({description: "Imagem identificando o problema", type: "string", format: "binary"})
    file: Express.Multer.File
}