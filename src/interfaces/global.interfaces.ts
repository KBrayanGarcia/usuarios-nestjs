
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


export type ExtrasErrorType<T = ExtrasError> = T extends ExtrasError
    ? ExtrasError
    : Required<Extract<T, { [key: string]: any }>> & ExtrasError;

export interface CustomErrorParams<T = ExtrasError> {
    message: string;
    statusCode: number;
    extras?: ExtrasErrorType<T>;
}

export interface SuperErrorParams<T = ExtrasError> extends ResponseFormat<ExtrasErrorType<T>> {}