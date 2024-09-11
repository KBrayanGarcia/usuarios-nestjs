import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DateService } from "./services/date.service"; // Importar el nuevo servicio
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors";
import { createValidationPipe } from "./pipes";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        DateService,
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
