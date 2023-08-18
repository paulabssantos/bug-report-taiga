import { Controller, Get, Param, Request } from '@nestjs/common';
import { ListSystemService } from './list-system.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { System } from '../../entities/system.entity';

@ApiTags("system")
@Controller('system')
export class ListSystemController {
    constructor(private listSystemService: ListSystemService) { }

    @ApiOperation({summary: "Lista todos os sistemas os quais podem ser feitas solicitações"})
    @ApiOkResponse({type: System, isArray: true})
    @Get()
    async create() {
        return await this.listSystemService.execute()
    }
}
