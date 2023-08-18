import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@Schema()
export class System {
  @ApiProperty({description: "Id do sistema",  type: "string"})
  _id: ObjectId

  @ApiProperty({description: "Nome do sistema"})
  @Prop()
  name: string;
}