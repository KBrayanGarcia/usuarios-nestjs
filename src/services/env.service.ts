import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/config/env.config";

@Injectable()
export class EnvService extends ConfigService<EnvironmentVariables, true> {
    constructor() {
        super();
    }
}
