import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "src/common/classes";

@Injectable()
export class EnvService extends ConfigService<EnvironmentVariables, true> {
    constructor() {
        super();
    }
}
