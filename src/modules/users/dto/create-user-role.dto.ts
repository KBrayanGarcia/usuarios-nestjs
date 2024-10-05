import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { UserRoleCreateInput } from "../entity/user_roles.entity";
import { UserEntity } from "../entity/user.entity";
import { RoleEntity } from "../entity/role.entity";

export class CreateUserRoleDto implements UserRoleCreateInput {
    @ApiProperty({ default: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    estado: boolean;

    @ApiProperty({ required: true, example: 1 })
    @IsNotEmpty()
    user: UserEntity;

    @ApiProperty({ required: true, example: 1 })
    @IsNotEmpty()
    role: RoleEntity;
}
