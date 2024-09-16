import { ValidationPipe } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { ErrorCampos } from "../interfaces/global.interfaces";
import { CustomErrorClass } from "../classes/custom_error.class";
import { APP_PIPE } from "@nestjs/core";

export const createValidationPipe = () => {
    return new ValidationPipe({
        exceptionFactory: (errors) => {
            const errors_format: ErrorCampos[] = [];
            errors.forEach((error) => {
                const errors = error.constraints;
                Object.keys(errors).forEach((key) =>
                    errors_format.push({
                        path: error.property,
                        message: errors[key].toString().replace("Error: ", ""),
                    })
                );
            });
            return new CustomErrorClass({
                message: "Existen errores de validación, revisa los campos",
                statusCode: HttpStatus.BAD_REQUEST,
                extras: {
                    errores_campos: errors_format,
                },
            });
        },
        stopAtFirstError: false,
    });
};

export const ValidationPipeProvider = {
    provide: APP_PIPE,
    useFactory: createValidationPipe,
};
