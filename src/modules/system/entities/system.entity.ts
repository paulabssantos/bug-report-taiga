import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class System {
  _id: ObjectId

  @Prop()
  name: string;
}