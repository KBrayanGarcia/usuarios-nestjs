import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { length_apellido_materno, length_apellido_paterno, length_nombre, length_nombre_completo, UserCreateInput } from "../entity/user.entity";

export class CreateUserDto implements UserCreateInput {
    @ApiProperty({ maxLength: length_nombre, required: true, example: "Juan" })
    @IsString()
    @MaxLength(length_nombre)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ maxLength: length_apellido_paterno, required: true, example: "Perez" })
    @IsString()  
    @MaxLength(length_apellido_paterno)
    @IsNotEmpty()
    apellido_paterno: string;

    @ApiProperty({ maxLength: length_apellido_materno, required: false, example: "Gomez" })
    @IsString()
    @MaxLength(length_apellido_materno)
    @IsOptional()
    apellido_materno?: string;

    @ApiProperty({ maxLength: length_nombre_completo, required: true, readOnly: true, example: "Juan Perez Gomez" })
    nombre_completo: string;

    @ApiProperty({ maxLength: 255, required: false, uniqueItems: true, example: "juanperez@gmail.com" })
    @IsEmail()
    @MaxLength(255)
    @IsOptional()
    correo_electronico?: string;

    @ApiProperty({ maxLength: 100, required: true, uniqueItems: true, example: "juan.perez" })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    usuario: string;

    @ApiProperty({ maxLength: 255, required: true, example: "juanperez" })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()  
    password: string;

    @ApiProperty({ default: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    estado: boolean;
}
