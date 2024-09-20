import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { UserInsert } from "../entity/user.entity";

export class CreateUserDto implements UserInsert {
    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @MaxLength(255, { message: "El nombre no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan Perez", required: true, type: String })
    name: string;

    @IsEmail({}, { message: "El correo electrónico debe ser válido" })
    @IsNotEmpty({ message: "El correo electrónico es requerido" })
    @MaxLength(255, { message: "El correo electrónico no puede tener más de 255 caracteres" })
    @ApiProperty({
        description: "Correo electrónico del usuario",
        example: "juan@example.com",
        required: true,
        type: String,
    })
    email: string;

    @IsString({ message: "La contraseña debe ser una cadena de texto" })
    @IsNotEmpty({ message: "La contraseña es requerida" })
    @MaxLength(255, { message: "La contraseña no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Contraseña del usuario", example: "password123", required: true, type: String })
    password: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @MaxLength(255, { message: "El nombre no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan Perez", required: true, type: String })
    first_name: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @MaxLength(255, { message: "El nombre no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan Perez", required: true, type: String })
    last_name: string;

    @IsString({ message: "El nombre debe ser una cadena de texto" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @MaxLength(255, { message: "El nombre no puede tener más de 255 caracteres" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan Perez", required: true, type: String })
    fullname: string;
}
