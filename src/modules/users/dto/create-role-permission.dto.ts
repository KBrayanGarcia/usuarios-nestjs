import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { RolePermissionCreateInput } from "../entity/role_permissions.entity";
import { RoleEntity } from "../entity/role.entity";
import { PermissionEntity } from "../entity/permissions.entity";

export class CreateRolePermissionDto implements RolePermissionCreateInput {
    @ApiProperty({ default: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    estado: boolean;

    @ApiProperty({ required: true, example: 1 })
    @IsNotEmpty()
    role: RoleEntity;

    @ApiProperty({ required: true, example: 1 })
    @IsNotEmpty()
    permission: PermissionEntity;
}
