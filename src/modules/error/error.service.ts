import { Injectable } from "@nestjs/common";
import { CustomErrorClass } from "./classes/custom_error.class";

@Injectable()
export class ErrorService {
    handleError(error: any): never {
        if (error instanceof CustomErrorClass) {
            throw error;
        } else {
            throw new CustomErrorClass({
                message: error.message || "Ocurrió un error inesperado",
                statusCode: 500,
                extras: { ...error.extras },
            });
        }
    }
}
