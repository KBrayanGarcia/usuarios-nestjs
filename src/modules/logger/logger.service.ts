import { Injectable, Logger } from "@nestjs/common";
import { winstonLoggerError, winstonLoggerWarn } from "./config/logger.config";

@Injectable()
export class LoggerService extends Logger {
    error(object: any, trace?: string) {
        winstonLoggerError.error({ ...object, trace });
        super.error(`${object.message} - UUID: ${object.extras.uuid}`);
    }

    warn(object: any, trace?: string) {
        const maxTraceLength = 700;
        const truncatedTrace =
            trace && trace.length > maxTraceLength ? trace.substring(0, maxTraceLength) + "..." : trace;
        winstonLoggerWarn.warn({
            ...object,
            trace: truncatedTrace,
        });
        super.warn(`${object.message} - UUID: ${object.extras.uuid}`);
    }
}
