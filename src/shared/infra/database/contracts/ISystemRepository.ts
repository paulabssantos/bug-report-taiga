import { System } from "src/modules/system/entities/system.entity";

export abstract class SystemRepository{
    abstract list():Promise<System[]>
}