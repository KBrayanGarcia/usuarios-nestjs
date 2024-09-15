import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EnvService } from "./common/services";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const envService = app.get(EnvService);

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle("API")
        .setDescription("API para la gestion de la plataforma")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const port_listen = envService.get("PORT");
    const host_listen = envService.get("HOST");

    await app.listen(port_listen, host_listen);
}
bootstrap();
