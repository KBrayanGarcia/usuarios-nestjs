import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResponseInterceptorProvider } from "./modules/common/interceptors/response.interceptor";
import { ValidationPipeProvider } from "./modules/common/pipes/validation.pipe";
import { ServerModule } from "./modules/server/server.module";
import { CommonModule } from "./modules/common/common.module";
import { EnvModule } from "./modules/env/env.module";
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [ServerModule, CommonModule, EnvModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptorProvider, ValidationPipeProvider],
})
export class AppModule {}
