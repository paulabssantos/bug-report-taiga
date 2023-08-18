import { Module } from '@nestjs/common';
import { ListSystemController } from './services/list-system-service/list-system.controller';
import { ListSystemService } from './services/list-system-service/list-system.service';
@Module({
  controllers: [ListSystemController],
  providers: [ListSystemService],
})
export class SystemModule {}
