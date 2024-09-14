import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { LogLevel } from "src/enums";

const format_date = "yyyy-MM-dd";
const date_value_default: string = "2024-01-01";

export class LogsQueryDto {
    @IsEnum(LogLevel, { message: `El nivel de log debe ser '${Object.values(LogLevel).join("', '")}'` })
    @IsOptional()
    @ApiProperty({
        name: "level",
        required: false,
        enum: LogLevel,
        description: "Nivel de log",
        default: LogLevel.ERROR,
    })
    level?: LogLevel = LogLevel.ERROR;

    @IsDateString()
    @IsOptional()
    @ApiProperty({
        name: "date",
        required: false,
        type: Date,
        description: `Fecha en formato ${format_date}`,
        default: date_value_default,
    })
    date?: string = date_value_default;
}
