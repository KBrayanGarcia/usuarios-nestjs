import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseFactory } from "./factories/response.factory";
import { ResponseFormat, ServerStatusExtras } from "./interfaces";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("/status")
    getStatusServer(): ResponseFormat<ServerStatusExtras> {
        const datos = this.appService.getServerStatus();
        return ResponseFactory.createResponse<ServerStatusExtras>({
            message: "Estado del servidor obtenido correctamente",
            extras: datos,
        });
    }

    @Get()
    getSimulateError() {
        this.appService.simulateError();
        return ResponseFactory.createResponse({
            message: "Se envio respuesta 202 ya que no se realizo correctamente la simulacion de error",
            styles: "error",
        });
    }

    @Post()
    async validateData(@Body() data: any) {
        const validatedData = await this.appService.validateData(data);
        return ResponseFactory.createResponse({
            message: "Datos validados correctamente",
            extras: validatedData,
        });
    }
}
