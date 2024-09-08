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

export interface ErrorCampos {
    path: string;
    message: string;
}

export interface ExtrasError {
    errores_campos?: ErrorCampos[];
    uuid?: string;
}

export type ExtrarErrorPickCampos = Pick<ExtrasError, "errores_campos">;

export type ExtrasErrorType<T = ExtrarErrorPickCampos> = T extends ExtrarErrorPickCampos
    ? ExtrarErrorPickCampos
    : Required<Extract<T, { [key: string]: any }>> & ExtrarErrorPickCampos;

export interface CustomErrorParams<T = ExtrarErrorPickCampos> {
    message: string;
    statusCode: number;
    extras?: ExtrasErrorType<T>;
}

export interface SuoerErrorParams<T = ExtrarErrorPickCampos> extends ResponseFormat<ExtrasErrorType<T>> {}

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
