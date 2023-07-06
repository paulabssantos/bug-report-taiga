import { Injectable } from "@nestjs/common";
import { SystemRepository } from "../../contracts/ISystemRepository";
import { System } from "src/modules/system/entities/system.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SystemRepositoryInMongo implements SystemRepository {
    constructor(@InjectModel(System.name) private systemModel: Model<System>) { }
    async list(): Promise<System[]> {
        const systems = await this.systemModel.find()  
        return systems
    }

}