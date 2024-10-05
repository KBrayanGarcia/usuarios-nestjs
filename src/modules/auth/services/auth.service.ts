import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { CustomErrorClass } from "../../error/classes/custom_error.class";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/modules/users/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(username: string, pass: string): Promise<UserEntity> {
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
                message: "Credenciales inválidas",
                statusCode: 401,
            });
        }

        return user;
    }
}
