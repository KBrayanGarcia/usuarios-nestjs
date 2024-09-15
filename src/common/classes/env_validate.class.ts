import { IsEnum, IsNumber, IsString } from "class-validator";
import { Environment } from "../enums";

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    HOST: string;

    @IsString()
    DB_HOST: string;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_DATABASE: string;
}
