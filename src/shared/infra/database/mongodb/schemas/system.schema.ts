import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { System } from "../../../../../modules/system/entities/system.entity"

export type ReportDocument = HydratedDocument<System>;

export const SystemSchema = SchemaFactory.createForClass(System);