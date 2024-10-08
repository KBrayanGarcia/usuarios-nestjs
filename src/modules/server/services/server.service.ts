import { Injectable } from "@nestjs/common";
import { LogsQueryDto } from "../dtos/logs-query.dto";
import { ValidateDataTestDto } from "../dtos/validate_data_test.dto";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { DateService } from "./date.service";
import { EnvService } from "src/modules/env/service/env.service";
import { CustomErrorClass } from "../../../modules/error/classes/custom_error.class";
import { ServerStatusExtras } from "../interfaces/server.interface";
import { FormatClass } from "../../../modules/server/classes/format.class";

@Injectable()
export class ServerService {
    constructor(
        private readonly dateService: DateService,
        private readonly envService: EnvService
    ) {}

    // Método para simular un error
    simulateError(): never {
        throw new CustomErrorClass({
            message: "Error provocado para probar el error asad",
            statusCode: 500,
        });
    }

    async validateData(data: ValidateDataTestDto): Promise<ValidateDataTestDto> {
        return data;
    }

    getServerStatus(): ServerStatusExtras {
        return {
            environment: this.envService.get("NODE_ENV"),
            estado: "En ejecución",
            tiempoActivo: FormatClass.formatUptime(process.uptime()),
            memoria: {
                rss: FormatClass.formatMemoryUsage(process.memoryUsage().rss),
                heapTotal: FormatClass.formatMemoryUsage(process.memoryUsage().heapTotal),
                heapUsado: FormatClass.formatMemoryUsage(process.memoryUsage().heapUsed),
            },
            cpu: {
                usuario: FormatClass.formatCpuUsage(process.cpuUsage().user),
                sistema: FormatClass.formatCpuUsage(process.cpuUsage().system),
            },
            plataforma: process.platform,
            versionNode: process.version,
            idProceso: process.pid,
        };
    }

    async getLogs(query: LogsQueryDto): Promise<string[]> {
        const { level, date } = query;
        const logsDir = join(__dirname, "logs", level);
        const logFileName = `${level}-${date}.log`;
        const logFilePath = join(logsDir, logFileName);
        if (!existsSync(logFilePath)) {
            throw new CustomErrorClass({
                message: `No se encontraron logs para el nivel '${level}' y la fecha '${date}'`,
                statusCode: 404,
            });
        }

        const fileContent = await readFile(logFilePath, "utf-8");

        return fileContent
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line) => JSON.parse(line));
    }

    getServerUTCDate(): Date {
        return this.dateService.getUTCDate();
    }

    getServerLocalDate(): Date {
        return this.dateService.getLocalDate();
    }

    setServerDate(date: string): void {
        this.dateService.setCustomDate(date);
    }

    resetServerDate(): void {
        this.dateService.setCustomDate(null);
    }
}
