import { Injectable } from "@nestjs/common";
import * as Yup from "yup";
import { FormatUtility } from "./utilitys";
import { ServerStatusExtras } from "./interfaces";

@Injectable()
export class AppService {
    // Método para simular un error
    simulateError(): never {
        throw new Error("Error provocado para probar el error asad");
    }

    async validateData(data: any): Promise<any> {
        const schema = Yup.object().shape({
            name: Yup.string().required("El nombre es obligatorio"),
            age: Yup.number().positive().integer().required("La edad es obligatoria"),
        });

        const datos = await schema.validate(data, { abortEarly: false });
        return datos;
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
