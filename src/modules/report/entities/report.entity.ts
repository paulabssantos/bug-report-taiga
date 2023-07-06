import { Prop, Schema } from '@nestjs/mongoose';
import * as dayjs from 'dayjs'

@Schema()
export class Report {
  @Prop()
  name: string;

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