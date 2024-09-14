import { Environment } from '../enums/environment.enum';

export interface EnvironmentVariablesInterface {
    NODE_ENV: Environment;
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
}