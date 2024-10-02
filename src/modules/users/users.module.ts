import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { ResponseModule } from "../response/response.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
    imports: [ResponseModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
