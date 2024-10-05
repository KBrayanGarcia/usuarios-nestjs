import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PermissionCreateInput } from "../entity/permissions.entity";

export class CreatePermissionDto implements PermissionCreateInput {
    @ApiProperty({ maxLength: 100, required: true, example: "Crear usuarios", uniqueItems: true })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ maxLength: 255, required: false, example: "Permiso para crear usuarios" })
    @IsString()
    @MaxLength(255)
    descripcion?: string;
}
