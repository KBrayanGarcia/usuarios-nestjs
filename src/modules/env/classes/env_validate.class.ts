import { IsEnum, IsNumber, IsString } from "class-validator";
import { Environment } from "../enums/environment.enum";

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    PORT: number;

    @IsString()
    HOST: string;

    @IsString()
    DB_HOST: string;

    @IsString()
    DB_USER: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_NAME: string;

    @IsNumber()
    DB_PORT: number;
}
