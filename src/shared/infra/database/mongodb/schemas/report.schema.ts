import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as dayjs from 'dayjs'
export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop()
  name: string;

  @Prop()
  registration: number;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  system: string;

  @Prop()
  user_story_id: number;

  @Prop({default: false})
  done: boolean

  @Prop({default: dayjs().format('YYYY-MM-DDTHH:mm:ss-00:00')})
  date: Date

}

export const ReportSchema = SchemaFactory.createForClass(Report);