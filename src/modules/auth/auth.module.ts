import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "../users/users.module";
import { ResponseModule } from "../response/response.module";
import { JwtModule } from "@nestjs/jwt";
import { EnvService } from "../env/service/env.service";
import { EnvModule } from "../env/env.module";
import { AuthGuard } from "./guards/auth.guard";

@Module({
    imports: [
        UsersModule,
        ResponseModule,
        EnvModule,
        JwtModule.registerAsync({
            global: true,
            imports: [EnvModule],
            inject: [EnvService],
            useFactory: (envService: EnvService) => ({
                secret: envService.get("JWT_SECRET"),
                signOptions: { expiresIn: envService.get("JWT_EXPIRES_IN") },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard],
})
export class AuthModule {}
