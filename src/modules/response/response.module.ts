import { Module } from "@nestjs/common";
import { ResponseService } from "./response.service";
import { ErrorModule } from "../error/error.module";

@Module({
    imports: [ErrorModule],
    providers: [ResponseService],
    exports: [ResponseService],
})
export class ResponseModule {}
