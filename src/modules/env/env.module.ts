import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "src/modules/env/config/env.config";
import { EnvService } from "./service/env.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
        }),
    ],
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {}
