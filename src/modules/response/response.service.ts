import { Injectable } from "@nestjs/common";
import { ResponseFormat } from "../../interfaces/global.interfaces";

@Injectable()
export class ResponseService {
    createResponse<T = object>(data: ResponseFormat<T>): ResponseFormat<T> {
        return {
            message: data.message || "Acción realizada correctamente",
            styles: data.styles || "success",
            extras: data.extras,
        };
    }
}
