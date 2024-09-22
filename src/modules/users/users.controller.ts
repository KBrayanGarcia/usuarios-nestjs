import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
        return this.responseService.createResponse({
            message: this.usersService.create(createUserDto),
        });
    }

    @ApiOperation({ summary: "Obtiene todos los usuarios" }) // Documentación añadida
    @Get()
    async findAll() {
        return this.responseService.createResponse({
            message: this.usersService.findAll(),
        });
    }

    @ApiOperation({ summary: "Obtiene un usuario por ID" }) // Documentación añadida
    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.responseService.createResponse({
            message: this.usersService.findOne(Number(id)),
        });
    }

    @ApiOperation({ summary: "Actualiza un usuario por ID" }) // Documentación añadida
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.responseService.createResponse({
            message: this.usersService.update(+id, updateUserDto),
        });
    }

    @ApiOperation({ summary: "Elimina un usuario por ID" }) // Documentación añadida
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.responseService.createResponse({
            message: this.usersService.remove(+id),
        });
    }
}
