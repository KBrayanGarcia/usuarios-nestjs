import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EnvService } from "src/modules/env/service/env.service";
import { CustomErrorClass } from "src/modules/error/classes/custom_error.class";
import { RequestAuth } from "../interfaces/request.auth.interface";
import { PayloadAuth } from "../interfaces/payload.auth.interface";
import { UsersService } from "src/modules/users/services/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private envService: EnvService,
        private usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestAuth>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new CustomErrorClass({
                message: "No se proporcionó un token de autenticación",
                statusCode: 401,
            });
        }

        const payload: PayloadAuth = await this.jwtService.verifyAsync(token, {
            secret: this.envService.get("JWT_SECRET"),
        });

        if (!payload) {
            throw new CustomErrorClass({
                message: "Token inválido",
                statusCode: 401,
            });
        }

        const user = await this.usersService.findOne(Number(payload.id));

        if (!user) {
            throw new CustomErrorClass({
                message: "El usuario que se intenta autenticar no existe",
                statusCode: 404,
            });
        }

        request.user = user;

        return true;
    }

    private extractTokenFromHeader(request: RequestAuth): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
