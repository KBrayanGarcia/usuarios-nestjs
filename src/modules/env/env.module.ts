import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "src/modules/env/config/env.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
        }),
    ],
    exports: [ConfigModule],
})
export class EnvModule {}
