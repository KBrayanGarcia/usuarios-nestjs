import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../dtos/sign-in.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { UserEntity } from "src/modules/users/entity/user.entity";
import { AuthGuard } from "../guards/auth.guard";
import { RequestAuth } from "../interfaces/request.auth.interface";

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
        const token = await this.authService.signIn(signInDto.username, signInDto.password);
        return this.responseService.createResponse<{ token: string }>({
            message: "Inicio de sesión exitoso",
            extras: { token },
        });
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: "Obtiene el usuario autenticado" })
    @Get("/userAuthenticated")
    async getUserAuthenticated(@Req() request: RequestAuth) {
        const user = await this.authService.getUserAuthenticated(request);
        return this.responseService.createResponse<{ user: UserEntity }>({
            message: "Usuario autenticado",
            extras: { user },
        });
    }
}
