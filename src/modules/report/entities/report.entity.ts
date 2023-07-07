import { Prop, Schema } from '@nestjs/mongoose';
import * as dayjs from 'dayjs'
import { ObjectId } from 'mongoose';

@Schema()
export class Report {
  _id: ObjectId;

  @Prop()
  email: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  system: string;

  @Prop({ default: false })
  done: boolean

  @Prop({default: dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')})
  date: Date

  @Prop()
  image_path: string;

}