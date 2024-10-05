import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RolesService } from "../services/roles.service";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { RoleEntity } from "../entity/role.entity";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";

@ApiTags("ROLES")
@Controller("roles")
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
        private readonly responseService: ResponseService
    ) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Crea un nuevo rol" })
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<any> {
        const newRole = await this.rolesService.create(createRoleDto);
        return this.responseService.createResponse({
            message: "Rol creado exitosamente",
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Obtiene todos los roles" })
    @Get()
    async findAll() {
        const roles = await this.rolesService.findAll();
        return this.responseService.createResponse<{ listado: RoleEntity[] }>({
            message: "Roles obtenidos correctamente",
            extras: {
                listado: roles,
            },
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Obtiene un rol por ID" })
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        const role = await this.rolesService.findOne(Number(id));
        return this.responseService.createResponse<{ role: RoleEntity }>({
            message: "Rol obtenido correctamente",
            extras: { role },
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Actualiza un rol por ID" })
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<any> {
        const updatedRole = await this.rolesService.update(+id, updateRoleDto);
        return this.responseService.createResponse({
            message: "Rol actualizado exitosamente",
        });
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Elimina un rol por ID" })
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<any> {
        await this.rolesService.remove(+id);
        return this.responseService.createResponse({
            message: "Rol eliminado exitosamente",
        });
    }
}
