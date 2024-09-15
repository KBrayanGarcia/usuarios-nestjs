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
    DATABASE_URL: string;
}
