import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ServerService } from "./services/server.service";
import { ServerStatusExtras } from "./interfaces/server.interface";
import { ResponseClass } from "../common/classes/response.class";
import { ValidateDataTestDto } from "./dtos/validate_data_test.dto";
import { LogsQueryDto } from "./dtos/logs-query.dto";
import { SetServerDateDto } from "./dtos/set-server-date.dto";
import { ResponseFormat } from "../common/interfaces/global.interfaces";

@ApiTags("SERVIDOR Y PRUEBAS")
@Controller("/server")
export class ServerController {
    constructor(private readonly serverService: ServerService) {}

    @ApiOperation({ summary: "Obtener el estado del servidor" })
    @Get("/status")
    getStatusServer(): ResponseFormat<ServerStatusExtras> {
        const datos = this.serverService.getServerStatus();
        return ResponseClass.createResponse<ServerStatusExtras>({
            message: "Estado del servidor obtenido correctamente",
            extras: datos,
        });
    }

    @ApiOperation({ summary: "Simular un error" })
    @Get("/simulate-error")
    getSimulateError() {
        this.serverService.simulateError();
        return ResponseClass.createResponse({
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
        const validatedData = await this.serverService.validateData(data);
        return ResponseClass.createResponse({
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
        const logs = await this.serverService.getLogs(query);
        return ResponseClass.createResponse({
            message: "Logs obtenidos correctamente",
            extras: { logs },
        });
    }

    @ApiOperation({ summary: "Obtener la fecha del servidor en formato UTC y local" })
    @Get("/date")
    getServerDate() {
        const utcDate = this.serverService.getServerUTCDate();
        const localDate = this.serverService.getServerLocalDate();
        return ResponseClass.createResponse({
            message: "Fechas del servidor obtenidas correctamente",
            extras: { fecha_universal: utcDate, fecha_local: localDate },
        });
    }

    @ApiOperation({ summary: "Establecer una fecha personalizada en el servidor" })
    @Post("/set-date")
    setServerDate(@Body() data: SetServerDateDto) {
        this.serverService.setServerDate(data.date);
        return ResponseClass.createResponse({
            message: "Fecha personalizada establecida correctamente en el servidor",
        });
    }

    @ApiOperation({ summary: "Restablecer la fecha del servidor a la actual" })
    @Post("/reset-date")
    resetServerDate() {
        this.serverService.resetServerDate();
        return ResponseClass.createResponse({
            message: "Fecha del servidor restablecida a la actual",
        });
    }
}
