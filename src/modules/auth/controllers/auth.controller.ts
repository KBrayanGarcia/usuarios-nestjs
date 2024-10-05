import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../dtos/sign-in.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { UserEntity } from "src/modules/users/entity/user.entity";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private responseService: ResponseService
    ) {}

    @ApiOperation({ summary: "Inicia sesión con un usuario" })
    @Post("/signIn")
    async signIn(@Body() signInDto: SignInDto) {
        const user = await this.authService.signIn(signInDto.username, signInDto.password);
        return this.responseService.createResponse<{user: UserEntity}>({
            message: "Inicio de sesión exitoso",
            extras: { user }
        });
    }
}
