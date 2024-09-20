import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "./entity/user.entity";
import { ResponseService } from "../response/response.service";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly responseService: ResponseService
    ) {}

    @ApiOperation({ summary: "Crea un nuevo usuario" })
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const id = user[0].id;
        const user_created = await this.usersService.findOne(id);

        return this.responseService.createResponse<{ user: User[] }>({
            message: "Usuario creado correctamente",
            extras: {
                user: user_created,
            },
        });
    }

    @ApiOperation({ summary: "Obtiene todos los usuarios" }) // Documentación añadida
    @Get()
    async findAll() {
        return this.responseService.createResponse<{ users: User[] }>({
            message: "Usuarios obtenidos correctamente",
            extras: {
                users: await this.usersService.findAll(),
            },
        });
    }

    @ApiOperation({ summary: "Obtiene un usuario por ID" }) // Documentación añadida
    @Get(":id")
    async findOne(@Param("id") id: string) {
        const user = await this.usersService.findOne(Number(id));
        return this.responseService.createResponse<{ user: User[] }>({
            message: "Usuario obtenido correctamente",
            extras: {
                user: user,
            },
        });
    }

    @ApiOperation({ summary: "Actualiza un usuario por ID" }) // Documentación añadida
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.responseService.createResponse<{ user: string }>({
            message: "Usuario actualizado correctamente",
            extras: {
                user: this.usersService.update(+id, updateUserDto),
            },
        });
    }

    @ApiOperation({ summary: "Elimina un usuario por ID" }) // Documentación añadida
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.responseService.createResponse<{ user: string }>({
            message: "Usuario eliminado correctamente",
            extras: {
                user: this.usersService.remove(+id),
            },
        });
    }
}
