import { IsString, IsInt, Min, Max, IsNotEmpty } from "class-validator";

export class ValidateDataTestDto {
    @IsString({ message: "El nombre debe ser un string" })
    @IsNotEmpty({ message: "El nombre es requerido" })
    name: string;

    @IsInt({ message: "La edad debe ser un número entero" })
    @Min(0, { message: "La edad mínima permitida es 0" })
    @Max(120, { message: "La edad máxima permitida es 120" })
    age: number;
}
