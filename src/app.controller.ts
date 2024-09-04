import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseUtility } from "./utilitys/response.utility";
import { ResponseFormat, ServerStatusExtras } from "./interfaces";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
        summary: "Validar datos",
        description:
            "Valida los datos del usuario, y muestra los datos validados, ademas, en caso de que los datos no sean validados, se mostrara un mensaje de error",
    })
    @Post("/validate-data")
    async validateData(@Body() data: any) {
        const validatedData = await this.appService.validateData(data);
        return ResponseUtility.createResponse({
            message: "Datos validados correctamente",
            extras: validatedData,
        });
    }
}
