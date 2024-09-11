import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { LogLevel } from "src/helper_classes";
import { DateServer } from "src/helper_classes";

const format_date = "yyyy-MM-dd";
const date_value_default: string = DateServer.formatDate(DateServer.getLocalDate(), format_date);

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
