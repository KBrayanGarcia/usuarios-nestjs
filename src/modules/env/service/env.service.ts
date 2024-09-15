import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../classes/env_validate.class";

@Injectable()
export class EnvService extends ConfigService<EnvironmentVariables, true> {
    constructor() {
        super();
    }
}
