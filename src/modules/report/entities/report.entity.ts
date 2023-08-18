import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs'
import { ObjectId } from 'mongoose';

@Schema()
export class Report {
  @ApiProperty({description: "Id do report", type: "string"})
  _id: ObjectId;

  @ApiProperty({description: "Email do solicitante"})
  @Prop()
  email: string;

  @ApiProperty({description: "Título do problema"})
  @Prop()
  title: string;

  @ApiProperty({description: "Descrição do problema"})
  @Prop()
  description: string;

  @ApiProperty({description: "Sistema que foi reportado o problema"})
  @Prop()
  system: string;

  @ApiProperty({description: "Status de finalização do reparo do problema"})
  @Prop({ default: false })
  done: boolean

  @ApiProperty({description: "Data da solicitação do report"})
  @Prop({default: dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')})
  created_at: Date

  @ApiProperty({description: "Data da finalização do report"})
  @Prop()
  updated_at: Date

  @ApiProperty({description: "Caminho da imagem do problema"})
  @Prop()
  image_path: string;

}