import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { UserRolesService } from "../services/user-roles.service";
import { CreateUserRoleDto } from "../dto/create-user-role.dto";
import { UpdateUserRoleDto } from "../dto/update-user-role.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { UserRoleEntity } from "../entity/user_roles.entity";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";

@ApiTags("USER ROLES")
@Controller("user-roles")
export class UserRolesController {
    constructor(
        private readonly userRolesService: UserRolesService,
        private readonly responseService: ResponseService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Crea un nuevo rol de usuario" })
    @Post()
    async create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<any> {
        const newUserRole = await this.userRolesService.create(createUserRoleDto);
        return this.responseService.createResponse({
            message: "Rol de usuario creado exitosamente",
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Obtiene todos los roles de usuario" })
    @Get()
    async findAll() {
        const userRoles = await this.userRolesService.findAll();
        return this.responseService.createResponse<{ listado: UserRoleEntity[] }>({
            message: "Roles de usuario obtenidos correctamente",
            extras: {
                listado: userRoles,
            },
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Obtiene un rol de usuario por ID" })
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        const userRole = await this.userRolesService.findOne(Number(id));
        return this.responseService.createResponse<{ userRole: UserRoleEntity }>({
            message: "Rol de usuario obtenido correctamente",
            extras: { userRole },
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Actualiza un rol de usuario por ID" })
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<any> {
        const updatedUserRole = await this.userRolesService.update(+id, updateUserRoleDto);
        return this.responseService.createResponse({
            message: "Rol de usuario actualizado exitosamente",
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Elimina un rol de usuario por ID" })
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<any> {
        await this.userRolesService.remove(+id);
        return this.responseService.createResponse({
            message: "Rol de usuario eliminado exitosamente",
        });
    }
}
