import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "./common/interceptors";
import { createValidationPipe } from "./common/pipes";
import { ConfigModule } from "@nestjs/config";
import { validate } from "./config/env.config";
import { ServerModule } from "./modules/server/server.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
        }),
        ServerModule,
    ],
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
