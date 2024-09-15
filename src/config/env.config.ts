import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { CustomErrorClass, EnvironmentVariables } from "src/modules/common/classes";

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new CustomErrorClass({
            message: errors.toString(),
            statusCode: 500,
        });
    }

    return validatedConfig;
}
