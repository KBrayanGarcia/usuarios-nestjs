import { HttpException } from "@nestjs/common";

import { v4 as uuidv4 } from "uuid";
import { CustomLoggerClass } from "./logger.class";
import { CustomErrorParams, ExtrasError, ExtrasErrorType, ResponseStyles, SuperErrorParams } from "../interfaces/global.interfaces";

/**
 * @description Esta clase se encarga de generar un error personalizado e instancía un error de aplicación, exclusivamente los registra en un archivo de log.
 * @IMPORTANT Esta clase **NO construye el objeto de respuesta**, sino que se encarga de registrar el error en un archivo de log.
 */
export class CustomErrorClass<T = ExtrasError> extends HttpException {
    readonly logger = new CustomLoggerClass(CustomErrorClass.name);
    message: string = "";
    statusCode: number = 500;
    styles: ResponseStyles;
    extras: ExtrasErrorType<T>;
    uuid: string;

    constructor(response: CustomErrorParams<T>) {
        const uuid = uuidv4();
        const styles = response.statusCode >= 400 && response.statusCode < 500 ? "warning" : "error";

        const data_error: SuperErrorParams<T> = {
            message: response.message,
            styles,
            extras: {
                ...response.extras,
                uuid,
            },
        };

        super(data_error, response.statusCode);

        this.statusCode = response.statusCode;
        this.message = response.message;
        this.extras = response.extras;
        this.uuid = uuid;
        this.styles = styles;

        if (styles === "error") {
            this.logger.error(data_error, this.stack);
        } else if (styles === "warning") {
            this.logger.warn(data_error, this.stack);
        }
    }
}
