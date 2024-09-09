import { Logger } from "@nestjs/common";
import { SuperErrorParams } from "src/interfaces";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const carpeta_logs = `${__dirname}/../logs`;

// Función para crear un logger de Winston con configuración compartida
const createWinstonLogger = (level: string, dirname: string) => createLogger({
    transports: [
        new transports.DailyRotateFile({
            level,
            filename: `${level}-%DATE%.log`,
            datePattern: "DD-MM-YYYY",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
            dirname: `${carpeta_logs}/${dirname}`,
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
        format.prettyPrint()
    ),
});

const winstonLoggerError = createWinstonLogger("error", "error");
const winstonLoggerWarn = createWinstonLogger("warn", "warn");

export class CustomLogger extends Logger {
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
