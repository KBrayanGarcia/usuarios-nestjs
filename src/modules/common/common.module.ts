// Start Generation Here
import { Global, Module } from "@nestjs/common";
import { EnvService } from "./services/env.service";
import { DateService } from "./services/date.service";

@Global()
@Module({
    providers: [EnvService, DateService],
    exports: [EnvService, DateService],
})
export class CommonModule {}
