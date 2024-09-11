import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseUtility } from "./utilitys/response.utility";
import { ResponseFormat, ServerStatusExtras } from "./interfaces";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidateDataTestDto, LogsQueryDto } from "./dtos";
import { Response } from "express";
import { LogLevel } from "./helper_classes";

@ApiTags("SERVIDOR Y PRUEBAS")
@Controller("/server")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({ summary: "Obtener el estado del servidor" })
    @Get("/status")
    getStatusServer(): ResponseFormat<ServerStatusExtras> {
        const datos = this.appService.getServerStatus();
        return ResponseUtility.createResponse<ServerStatusExtras>({
            message: "Estado del servidor obtenido correctamente",
            extras: datos,
        });
    }

    @ApiOperation({ summary: "Simular un error" })
    @Get("/simulate-error")
    getSimulateError() {
        this.appService.simulateError();
        return ResponseUtility.createResponse({
            message: "Se envio respuesta 202 ya que no se realizo correctamente la simulacion de error",
            styles: "error",
        });
    }

    @ApiOperation({
        summary: "Validar datos de prueba - Endpoint de testeo de validaciones de campos",
        description:
            "Valida los datos del usuario, y muestra los datos validados, ademas, en caso de que los datos no sean validados, se mostrara un mensaje de error",
    })
    @Post("/validate-data")
    async validateData(@Body() data: ValidateDataTestDto) {
        const validatedData = await this.appService.validateData(data);
        return ResponseUtility.createResponse({
            message: "Datos validados correctamente",
            extras: validatedData,
        });
    }

    @ApiOperation({
        summary: "Obtener los logs del servidor",
        description: "Obtiene los logs del servidor segun el nivel y la fecha",
    })
    @Get("/logs")
    async getLogsJson(@Query() query: LogsQueryDto) {
        const logs = await this.appService.getLogs(query);
        return ResponseUtility.createResponse({
            message: "Logs obtenidos correctamente",
            extras: { logs },
        });
    }
}
