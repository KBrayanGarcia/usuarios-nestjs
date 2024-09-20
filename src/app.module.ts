import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResponseInterceptorProvider } from "./modules/response/interceptors/response.interceptor";
import { ValidationPipeProvider } from "./modules/error/pipe/validation.pipe";
import { ServerModule } from "./modules/server/server.module";
import { EnvModule } from "./modules/env/env.module";
import { UsersModule } from "./modules/users/users.module";
import { LoggerModule } from "./modules/logger/logger.module";
import { ResponseModule } from "./modules/response/response.module";
import { ErrorModule } from "./modules/error/error.module";

@Module({
    imports: [ServerModule, EnvModule, UsersModule, ResponseModule, ErrorModule, LoggerModule],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptorProvider, ValidationPipeProvider],
})
export class AppModule {}
