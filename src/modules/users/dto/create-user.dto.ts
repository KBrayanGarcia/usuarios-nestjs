import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserCreateInput } from "../entity/user.entity";

export class CreateUserDto implements UserCreateInput {
    @ApiProperty({ maxLength: 150, required: true })
    @IsString()
    @MaxLength(150)
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ maxLength: 150, required: true })
    @IsString()  
    @MaxLength(150)
    @IsNotEmpty()
    apellido_paterno: string;

    @ApiProperty({ maxLength: 150, required: false })
    @IsString()
    @MaxLength(150)
    @IsOptional()
    apellido_materno?: string;

    @ApiProperty({ maxLength: 150, required: true })
    @IsString()
    @MaxLength(150) 
    @IsNotEmpty()
    nombre_completo: string;

    @ApiProperty({ maxLength: 255, required: false, uniqueItems: true })
    @IsEmail()
    @MaxLength(255)
    @IsOptional()  
    correo_electronico?: string;

    @ApiProperty({ maxLength: 100, required: true, uniqueItems: true })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    usuario: string;

    @ApiProperty({ maxLength: 255, required: true })
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()  
    password: string;

    @ApiProperty({ default: true, required: true })
    @IsBoolean()
    @IsNotEmpty()
    estado: boolean;
}
