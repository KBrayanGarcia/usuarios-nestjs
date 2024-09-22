import { Injectable, OnModuleInit } from "@nestjs/common";
import { EnvService } from "src/modules/env/service/env.service";

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(private readonly envService: EnvService) {}

    async onModuleInit() {}
}
