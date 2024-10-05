import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { CustomErrorClass } from "../../error/classes/custom_error.class";
import * as bcrypt from "bcrypt";
import { UserEntity } from "src/modules/users/entity/user.entity";
import { JwtService } from "@nestjs/jwt";
import { PayloadAuth } from "../interfaces/payload.auth.interface";
import { RequestAuth } from "../interfaces/request.auth.interface";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<string> {
        const user = await this.usersService.findUserForAuth(username);
        if (!user) {
            throw new CustomErrorClass({
                message: "Usuario no encontrado",
                statusCode: 404,
            });
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new CustomErrorClass({
                message: "La contraseña es incorrecta",
                statusCode: 401,
            });
        }

        const payload: PayloadAuth = { id: user.id.toString() };
        const token = this.jwtService.sign(payload);

        return token;
    }

    async getUserAuthenticated(request: RequestAuth): Promise<UserEntity> {
        const user = request.user;
        if (!user) {
            throw new CustomErrorClass({
                message: "No existe un usuario autenticado",
                statusCode: 404,
            });
        }
        return user;
    }
}
