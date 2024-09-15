import { Environment } from "src/modules/env/enums/environment.enum";

// Agregar la interfaz ServerStatusExtras
export interface ServerStatusExtras {
    environment: Environment;
    estado: string;
    tiempoActivo: string;
    memoria: {
        rss: string;
        heapTotal: string;
        heapUsado: string;
    };
    cpu: {
        usuario: string;
        sistema: string;
    };
    plataforma: string;
    versionNode: string;
    idProceso: number;
}
