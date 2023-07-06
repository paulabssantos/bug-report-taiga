import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportRepositoryInMongo } from './mongodb/repositories/ReportRepositoryInMongo';
import { ReportRepository } from './contracts/IReportRepository';
import { ReportSchema } from './mongodb/schemas/report.schema';
import { Report } from "../../../modules/report/entities/report.entity";
import { System } from 'src/modules/system/entities/system.entity';
import { SystemSchema } from './mongodb/schemas/system.schema';
import { SystemRepository } from './contracts/ISystemRepository';
import { SystemRepositoryInMongo } from './mongodb/repositories/SystemRepositoryInMongo';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      dbName: config.get<string>('DB_NAME'),
      uri: config.get<string>('DATABASE_URL'),
    })
  }),MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema, collection: 'reports' }, {name: System.name, schema: SystemSchema, collection: 'system'}])],
  providers: [{ provide: ReportRepository, useClass: ReportRepositoryInMongo }, {provide: SystemRepository, useClass: SystemRepositoryInMongo}],
  exports: [ReportRepository, SystemRepository]
})
export class DatabaseModule { }