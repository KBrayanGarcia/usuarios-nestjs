import { HttpStatus } from "@nestjs/common";
import { CustomErrorClass } from "src/helper_classes";

export class ErrorHandler {
    static handleError(error: any): never {
        let message: string;
        let statusCode: number;
        let extras: any = { ...error.extras };

        if (error instanceof CustomErrorClass) {
            throw error;
        } else if (error.name === "ValidationError") {
            const errorCampos = error.inner.map((err: any) => ({
                path: err.path,
                descripcion: err.message,
            }));
            message = "Existen validaciones de errores en el formulario, por favor revise los campos";
            statusCode = HttpStatus.BAD_REQUEST;
            extras.campos_error = errorCampos; // Asignar campos de error
        } else {
            message = error.message || "Ocurrio un error inesperado";
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        throw new CustomErrorClass({
            message,
            statusCode,
            extras,
        });
    }
}
