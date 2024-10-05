import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { RolePermissionsService } from "../services/role-permissions.service";
import { CreateRolePermissionDto } from "../dto/create-role-permission.dto";
import { UpdateRolePermissionDto } from "../dto/update-role-permission.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { RolePermissionEntity } from "../entity/role_permissions.entity";

@ApiTags("ROLE PERMISSIONS")
@Controller("role-permissions")
export class RolePermissionsController {
    constructor(
        private readonly rolePermissionsService: RolePermissionsService,
        private readonly responseService: ResponseService
    ) {}

    @ApiOperation({ summary: "Crea un nuevo permiso de rol" })
    @Post()
    async create(@Body() createRolePermissionDto: CreateRolePermissionDto): Promise<any> {
        const newRolePermission = await this.rolePermissionsService.create(createRolePermissionDto);
        return this.responseService.createResponse({
            message: "Permiso de rol creado exitosamente",
        });
    }

    @ApiOperation({ summary: "Obtiene todos los permisos de rol" })
    @Get()
    async findAll() {
        const rolePermissions = await this.rolePermissionsService.findAll();
        return this.responseService.createResponse<{ listado: RolePermissionEntity[] }>({
            message: "Permisos de rol obtenidos correctamente",
            extras: {
                listado: rolePermissions,
            },
        });
    }

    @ApiOperation({ summary: "Obtiene un permiso de rol por ID" })
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        const rolePermission = await this.rolePermissionsService.findOne(Number(id));
        return this.responseService.createResponse<{ rolePermission: RolePermissionEntity }>({
            message: "Permiso de rol obtenido correctamente",
            extras: { rolePermission },
        });
    }

    @ApiOperation({ summary: "Actualiza un permiso de rol por ID" })
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto): Promise<any> {
        const updatedRolePermission = await this.rolePermissionsService.update(+id, updateRolePermissionDto);
        return this.responseService.createResponse({
            message: "Permiso de rol actualizado exitosamente",
        });
    }

    @ApiOperation({ summary: "Elimina un permiso de rol por ID" })
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<any> {
        await this.rolePermissionsService.remove(+id);
        return this.responseService.createResponse({
            message: "Permiso de rol eliminado exitosamente",
        });
    }
}
