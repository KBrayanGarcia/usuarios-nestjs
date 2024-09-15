import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "./modules/common/interceptors";
import { createValidationPipe } from "./modules/common/pipes";
import { ServerModule } from "./modules/server/server.module";
import { CommonModule } from "./modules/common/common.module";
import { EnvModule } from "./modules/env/env.module";

@Module({
    imports: [ServerModule, CommonModule, EnvModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_PIPE,
            useFactory: createValidationPipe,
        },
    ],
})
export class AppModule {}
