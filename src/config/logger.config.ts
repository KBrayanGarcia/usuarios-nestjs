import { LogLevel } from "src/modules/server/enums";
import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";

const carpeta_logs = `${__dirname}/../logs`;

// Función para crear un logger de Winston con configuración compartida
const createWinstonLogger = (level: string, dirname: string) =>
    createLogger({
        transports: [
            new transports.DailyRotateFile({
                level,
                filename: `${level}-%DATE%.log`,
                datePattern: "YYYY-MM-DD",
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
            format.json()
        ),
    });

export const winstonLoggerError = createWinstonLogger(LogLevel.ERROR, LogLevel.ERROR);
export const winstonLoggerWarn = createWinstonLogger(LogLevel.WARN, LogLevel.WARN);
