import { Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { RolesService } from "./services/roles.service";
import { PermissionsService } from "./services/permissions.service";
import { RolePermissionsService } from "./services/role-permissions.service";
import { UserRolesService } from "./services/user-roles.service";
import { UsersController } from "./controllers/users.controller";
import { ResponseModule } from "../response/response.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { RoleEntity } from "./entity/role.entity";
import { PermissionEntity } from "./entity/permissions.entity";
import { RolePermissionEntity } from "./entity/role_permissions.entity";
import { UserRoleEntity } from "./entity/user_roles.entity";
import { RolesController } from "./controllers/roles.controller";
import { PermissionsController } from "./controllers/permissions.controller";
import { UserRolesController } from "./controllers/user-roles.controller";
import { RolePermissionsController } from "./controllers/role-permissions.controller";

@Module({
    imports: [
        ResponseModule,
        TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity, RolePermissionEntity, UserRoleEntity]),
    ],
    controllers: [
        UsersController,
        RolesController,
        PermissionsController,
        UserRolesController,
        RolePermissionsController,
    ],
    providers: [UsersService, RolesService, PermissionsService, RolePermissionsService, UserRolesService],
    exports: [UsersService, RolesService, PermissionsService, RolePermissionsService, UserRolesService],
})
export class UsersModule {}
