import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RoleCreateInput } from "../entity/role.entity";

export class CreateRoleDto implements RoleCreateInput {
    @ApiProperty({ maxLength: 100, required: true, example: "Admin", uniqueItems: true })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ maxLength: 255, required: false, example: "Rol de administrador" })
    @IsString()
    @MaxLength(255)
    descripcion?: string;
}
