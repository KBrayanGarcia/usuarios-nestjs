import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseClass } from "../common/classes/response.class";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: "Crea un nuevo usuario" })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return ResponseClass.createResponse<{ user: CreateUserDto }>({
            message: "Usuario creado correctamente",
            extras: {
                user: this.usersService.create(createUserDto),
            },
        });
    }

    @ApiOperation({ summary: "Obtiene todos los usuarios" }) // Documentación añadida
    @Get()
    async findAll() {
        return ResponseClass.createResponse<{ users: string }>({
            message: "Usuarios obtenidos correctamente",
            extras: {
                users: await this.usersService.findAll(),
            },
        });
    }

    @ApiOperation({ summary: "Obtiene un usuario por ID" }) // Documentación añadida
    @Get(":id")
    findOne(@Param("id") id: string) {
        return ResponseClass.createResponse<{ user: string }>({
            message: "Usuario obtenido correctamente",
            extras: {
                user: this.usersService.findOne(+id),
            },
        });
    }

    @ApiOperation({ summary: "Actualiza un usuario por ID" }) // Documentación añadida
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return ResponseClass.createResponse<{ user: string }>({
            message: "Usuario actualizado correctamente",
            extras: {
                user: this.usersService.update(+id, updateUserDto),
            },
        });
    }

    @ApiOperation({ summary: "Elimina un usuario por ID" }) // Documentación añadida
    @Delete(":id")
    remove(@Param("id") id: string) {
        return ResponseClass.createResponse<{ user: string }>({
            message: "Usuario eliminado correctamente",
            extras: {
                user: this.usersService.remove(+id),
            },
        });
    }
}
