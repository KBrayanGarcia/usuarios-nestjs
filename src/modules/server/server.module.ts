import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { DateService, EnvService } from "src/common/services";

@Module({
    controllers: [ServerController],
    providers: [ServerService, DateService, EnvService],
})
export class ServerModule {}
