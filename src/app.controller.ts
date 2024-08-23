import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ResponseFormat, ServerStatusExtras } from "./interfaces";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("/status")
    getStatusServer(): ResponseFormat<ServerStatusExtras> {
        const datos = this.appService.getServerStatus();
        return {
            message: "Estado del servidor obtenido correctamente",
            styles: "success",
            extras: datos,
        };
    }

    @Get()
    getSimulateError() {
        this.appService.simulateError();
    }

    @Post()
    validateData(@Body() data: any) {
        return this.appService.validateData(data);
    }
}
