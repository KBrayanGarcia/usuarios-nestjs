import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, HttpStatus } from "@nestjs/common";
import { CustomErrorClass } from "./helper_classes";
import { createValidationPipe } from "./pipes/validation.pipe"; // Importa la nueva función

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle("API")
        .setDescription("API para la gestion de la plataforma")
        .setVersion("1.0")
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}
bootstrap();
