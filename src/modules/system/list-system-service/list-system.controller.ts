import { Controller, Get, Param, Request } from '@nestjs/common';
import { ListSystemService } from './list-system.service';

@Controller('system')
export class ListSystemController {
    constructor(private listSystemService: ListSystemService) { }

    @Get()
    async create() {
        return await this.listSystemService.execute()
    }
}
