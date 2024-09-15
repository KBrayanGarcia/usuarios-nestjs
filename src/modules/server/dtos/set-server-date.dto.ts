import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

const format_date = "yyyy-MM-dd HH:mm:ss";
const date_value_default: string = "2024-01-01 00:00:00";

export class SetServerDateDto {
    @ApiProperty({
        description: `Fecha del servidor para establecer, pasarlo en formato '${format_date}' en region local`,
        example: date_value_default,
        required: true,
        format: "date-time",
        type: String,
    })
    @IsDateString()
    date: string;
}
