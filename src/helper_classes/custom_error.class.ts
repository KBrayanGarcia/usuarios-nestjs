import { HttpException, Logger } from "@nestjs/common";
import * as fs from "fs";
import { CustomErrorParams, SuoerErrorParams, ResponseStyles, ExtrasErrorType, ExtrarErrorPickCampos } from "src/interfaces";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Esta clase se encarga de generar un error personalizado e instancía un error de aplicación, exclusivamente los registra en un archivo de log.
 * @IMPORTANT Esta clase **NO construye el objeto de respuesta**, sino que se encarga de registrar el error en un archivo de log.
 */
export class CustomErrorClass<T = ExtrarErrorPickCampos> extends HttpException {
    readonly logger = new Logger(CustomErrorClass.name);
    message: string = "";
    statusCode: number = 500;
    styles: ResponseStyles;
    extras: ExtrasErrorType<T>;
    uuid: string;

    constructor(response: CustomErrorParams<T>) {
        const uuid = uuidv4();
        const styles = response.statusCode >= 400 && response.statusCode < 500 ? "warning" : "error";

        const data_error: SuoerErrorParams<T> = {
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
        this.logger.error("ERROR INTERCEPTADO:", data_error);
        this.logErrorToFile();
    }

    private logErrorToFile(): void {
        const errorId = uuidv4();
        const logDir = `${__dirname}/../logs/${this.styles}`;
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        const errorLog = `${new Date().toISOString()} - ID: ${errorId} - Error: ${JSON.stringify(this.getProperties())}\n`;
        fs.appendFileSync(`${logDir}/error.log`, errorLog);
    }

    private getProperties() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            extras: this.extras,
            uuid: this.uuid,
            styles: this.styles,
        };
    }
}
