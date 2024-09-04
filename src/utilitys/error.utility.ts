import { HttpStatus } from "@nestjs/common";
import { CustomErrorClass } from "src/helper_classes";

export class ErrorUtility {
    static handleError(error: any): never {
        let message: string;
        let statusCode: number;
        let extras: any = { ...error.extras };

        if (error instanceof CustomErrorClass) {
            throw error;
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
