import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { UserEntity } from "../entity/user.entity";
import { CustomErrorClass } from "../../error/classes/custom_error.class";

@ApiTags("USERS")
@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly responseService: ResponseService
    ) {}

    @ApiOperation({ summary: "Crea un nuevo usuario" })
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        createUserDto.nombre_completo = `${createUserDto.nombre} ${createUserDto.apellido_paterno} ${createUserDto.apellido_materno}`;
        const newUser = await this.usersService.create(createUserDto);
        return this.responseService.createResponse({
            message: "Usuario creado exitosamente",
        });
    }

    @ApiOperation({ summary: "Obtiene todos los usuarios" })
    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return this.responseService.createResponse<{ listado: UserEntity[] }>({
            message: "Usuarios obtenidos correctamente",
            extras: {
                listado: users,
            },
        });
    }

    @ApiOperation({ summary: "Obtiene un usuario por ID" })
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        const user = await this.usersService.findOne(Number(id));
        if (!user) {
            throw new CustomErrorClass({
                message: "Usuario no encontrado",
                statusCode: 404,
            });
        }
        return this.responseService.createResponse<{ user: UserEntity }>({
            message: "Usuario obtenido correctamente",
            extras: { user },
        });
    }

    @ApiOperation({ summary: "Actualiza un usuario por ID" })
    @Patch(":id")
    async update(@Query("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        const updatedUser = await this.usersService.update(+id, updateUserDto);
        return this.responseService.createResponse({
            message: "Usuario actualizado exitosamente",
        });
    }

    @ApiOperation({ summary: "Elimina un usuario por ID" })
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<any> {
        await this.usersService.remove(+id);
        return this.responseService.createResponse({
            message: "Usuario eliminado exitosamente",
        });
    }
}
