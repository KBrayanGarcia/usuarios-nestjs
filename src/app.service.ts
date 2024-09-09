import { Injectable } from "@nestjs/common";
import { FormatUtility } from "./utilitys";
import { ServerStatusExtras } from "./interfaces";
import { ValidateDataTestDto } from "./dtos";
import { CustomErrorClass } from "./helper_classes";

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
}
