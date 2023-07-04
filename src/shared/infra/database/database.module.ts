import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportRepositoryInMongo } from './mongodb/repositories/ReportRepositoryInMongo';
import { ReportRepository } from './mongodb/repositories/IReportRepositoryInMongo';
import { Report, ReportSchema } from './mongodb/schemas/report.schema';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      dbName: config.get<string>('DB_NAME'),
      uri: config.get<string>('DATABASE_URL'),
    })
  }),MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema, collection: 'reports' }])],
  providers: [{ provide: ReportRepository, useClass: ReportRepositoryInMongo }],
  exports: [ReportRepository]
})
export class DatabaseModule { }