import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Min, Max, IsNotEmpty } from "class-validator";

export class ValidateDataTestDto {
    @IsString({ message: "El nombre debe ser un string" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    @ApiProperty({ description: "Nombre del usuario", example: "Juan Perez", required: true, type: String })
    name: string;

    @IsInt({ message: "La edad debe ser un número entero" })
    @Min(0, { message: "La edad mínima permitida es 0" })
    @Max(120, { message: "La edad máxima permitida es 120" })
    @ApiProperty({ description: "Edad del usuario", example: 25, minimum: 0, maximum: 120, required: true, type: Number })
    age: number;
}
