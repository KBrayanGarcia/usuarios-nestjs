import { ValidationPipe } from "@nestjs/common";
import { CustomErrorClass } from "../classes";
import { HttpStatus } from "@nestjs/common";
import { ErrorCampos } from "../interfaces";

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
