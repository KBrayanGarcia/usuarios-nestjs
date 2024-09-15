import { IsEnum, IsNumber, IsString } from "class-validator";
import { Environment } from "../enums";

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    HOST: string;
}
