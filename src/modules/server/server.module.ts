import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { DateService } from "src/modules/common/services";
import { EnvService } from "../env/service";

@Module({
    controllers: [ServerController],
    providers: [ServerService, DateService, EnvService],
})
export class ServerModule {}
