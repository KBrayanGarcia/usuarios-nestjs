import { ResponseFormat } from "../interfaces";

export class ResponseFactory {
    static createResponse(
        data: any,
        defaultMessage: string = "Accion realizada correctamente",
        defaultStyle: "success" | "error" = "success"
    ): ResponseFormat<any> {
        const response: ResponseFormat<any> = {
            message: data.message || defaultMessage,
            styles: data.styles || defaultStyle,
            extras: data.extras
        };
        if (data.extras !== undefined) {
            response.extras = { ...response.extras, ...data.extras };
        }
        return response;
    }
}
