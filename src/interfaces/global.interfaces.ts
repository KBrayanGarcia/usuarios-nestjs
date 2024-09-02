// Agregado el tipo para styles
export type ResponseStyles = "success" | "error" | "warning" | "info";

// Modificado el ResponseFormat para usar el nuevo tipo
export interface ResponseFormat<T = object> {
    message?: string;
    styles?: ResponseStyles; // Cambiado a ResponseStyles
    extras?: T;
}

// Definición del tipo para evitar repetición
export type ResponsePick = Pick<ResponseFormat<any>, "message" | "extras">;

export interface CustomErrorParams {
    message: string;
    statusCode: number;
    extras?: Record<string, any>;
}

export interface SuoerErrorParams extends ResponseFormat<{ uuid: string }> {}

// Agregar la interfaz ServerStatusExtras
export interface ServerStatusExtras {
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
