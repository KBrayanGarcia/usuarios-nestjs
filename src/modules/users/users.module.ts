import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../database/database.module";
import { ResponseModule } from "../response/response.module";

@Module({
    imports: [DatabaseModule, ResponseModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
