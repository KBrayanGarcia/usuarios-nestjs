import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { EnvModule } from "src/modules/env/env.module";
import { DateService } from "./services/date.service";
import { ServerService } from "./services/server.service";
import { ResponseModule } from "../response/response.module";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [EnvModule, ResponseModule, AuthModule, UsersModule],
    controllers: [ServerController],
    providers: [DateService, ServerService],
    exports: [ServerService, DateService],
})
export class ServerModule {}
