import { ResponseFormat } from "../interfaces/global.interfaces";

export class ResponseClass {
    static createResponse<T = object>({
        message = "Accion realizada correctamente",
        styles = "success",
        extras,
    }: ResponseFormat<T>): ResponseFormat<T> {
        const response: ResponseFormat<T> = {
            message: message,
            styles: styles,
            extras: extras,
        };
        if (extras !== undefined) {
            response.extras = { ...response.extras, ...extras };
        }
        return response;
    }
}
