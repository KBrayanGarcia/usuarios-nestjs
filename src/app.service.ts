import { Injectable } from "@nestjs/common";
import { FormatUtility } from "./utilitys";
import { ServerStatusExtras } from "./interfaces";
import { ValidateDataTestDto } from "./dtos";
import { CustomErrorClass } from "./helper_classes";
import { LogsQueryDto } from "./dtos";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

@Injectable()
export class AppService {
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
            estado: "En ejecución",
            tiempoActivo: FormatUtility.formatUptime(process.uptime()),
            memoria: {
                rss: FormatUtility.formatMemoryUsage(process.memoryUsage().rss),
                heapTotal: FormatUtility.formatMemoryUsage(process.memoryUsage().heapTotal),
                heapUsado: FormatUtility.formatMemoryUsage(process.memoryUsage().heapUsed),
            },
            cpu: {
                usuario: FormatUtility.formatCpuUsage(process.cpuUsage().user),
                sistema: FormatUtility.formatCpuUsage(process.cpuUsage().system),
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
}
