import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersModule } from "../users/users.module";
import { ResponseModule } from "../response/response.module";

@Module({
    imports: [UsersModule, ResponseModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
