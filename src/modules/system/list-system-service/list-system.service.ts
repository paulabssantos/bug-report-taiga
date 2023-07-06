import { Injectable } from '@nestjs/common';
import { SystemRepository } from 'src/shared/infra/database/contracts/ISystemRepository';

@Injectable()
export class ListSystemService {
    constructor(private systemRepository: SystemRepository) { }
    async execute() {
        return await this.systemRepository.list()
    }
}
