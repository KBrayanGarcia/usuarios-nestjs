import { Logger } from "@nestjs/common";
import { SuperErrorParams } from "../interfaces/global.interfaces";
import { winstonLoggerError, winstonLoggerWarn } from "src/modules/common/config/logger.config";

export class CustomLoggerClass extends Logger {
    error(object: SuperErrorParams, trace?: string) {
        winstonLoggerError.error({ ...object, trace });
        super.error(`${object.message} - UUID: ${object.extras.uuid}`);
    }

    warn(object: SuperErrorParams, trace?: string) {
        const maxTraceLength = 700; // Longitud máxima del trace
        const truncatedTrace =
            trace && trace.length > maxTraceLength ? trace.substring(0, maxTraceLength) + "..." : trace;
        winstonLoggerWarn.warn({
            ...object,
            trace: truncatedTrace, // Registrar el trace truncado
        });
        super.warn(`${object.message} - UUID: ${object.extras.uuid}`);
    }
}
