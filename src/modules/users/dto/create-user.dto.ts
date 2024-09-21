import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserInsert } from "../entity/user.entity";

export class CreateUserDto implements UserInsert {
    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @MaxLength(255, { message: "El nombre no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan", required: true, type: String })
    nombre: string;

    @IsString({ message: "El apellido paterno debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El apellido paterno es requerido" })
    @MaxLength(255, { message: "El apellido paterno no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Apellido paterno del usuario", example: "Pérez", required: true, type: String })
    apellido_paterno: string;

    @IsString({ message: "El apellido materno debe ser una cadena de texto" })
    @MaxLength(255, { message: "El apellido materno no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Apellido materno del usuario", example: "García", required: false, type: String })
    apellido_materno?: string;

    @IsEmail({}, { message: "El correo electrónico debe ser válido" })
    @MaxLength(255, { message: "El correo electrónico no puede tener más de 255 caracteres" })
    @ApiProperty({
        description: "Correo electrónico del usuario",
        example: "juan@example.com",
        required: false,
        type: String,
    })
    email: string;

    @IsString({ message: "El nombre completo debe ser una cadena de texto" })
    @MaxLength(255, { message: "El nombre completo no puede tener más de 255 caracteres" })
    @ApiProperty({
        description: "Nombre completo del usuario",
        example: "Juan Pérez García",
        required: false,
        type: String,
        readOnly: true,
    })
    nombre_completo: string;

    @IsString({ message: "El usuario debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El usuario es requerido" })
    @MaxLength(255, { message: "El usuario no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Usuario del usuario", example: "juanperez", required: true, type: String })
    usuario: string;

    @IsString({ message: "La contraseña debe ser una cadena de texto" })
    @IsNotEmpty({ message: "La contraseña es requerida" })
    @MaxLength(255, { message: "La contraseña no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Contraseña del usuario", example: "password123", required: true, type: String })
    password: string;
}
