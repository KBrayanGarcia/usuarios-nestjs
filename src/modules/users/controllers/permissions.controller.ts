import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PermissionsService } from "../services/permissions.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatePermissionDto } from "../dto/update-permission.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseService } from "../../response/response.service";
import { PermissionEntity } from "../entity/permissions.entity";

@ApiTags("PERMISSIONS")
@Controller("permissions")
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService,
        private readonly responseService: ResponseService
    ) {}

    @ApiOperation({ summary: "Crea un nuevo permiso" })
    @Post()
    async create(@Body() createPermissionDto: CreatePermissionDto): Promise<any> {
        const newPermission = await this.permissionsService.create(createPermissionDto);
        return this.responseService.createResponse({
            message: "Permiso creado exitosamente",
        });
    }

    @ApiOperation({ summary: "Obtiene todos los permisos" })
    @Get()
    async findAll() {
        const permissions = await this.permissionsService.findAll();
        return this.responseService.createResponse<{ listado: PermissionEntity[] }>({
            message: "Permisos obtenidos correctamente",
            extras: {
                listado: permissions,
            },
        });
    }

    @ApiOperation({ summary: "Obtiene un permiso por ID" })
    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        const permission = await this.permissionsService.findOne(Number(id));
        return this.responseService.createResponse<{ permission: PermissionEntity }>({
            message: "Permiso obtenido correctamente",
            extras: { permission },
        });
    }

    @ApiOperation({ summary: "Actualiza un permiso por ID" })
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<any> {
        const updatedPermission = await this.permissionsService.update(+id, updatePermissionDto);
        return this.responseService.createResponse({
            message: "Permiso actualizado exitosamente",
        });
    }

    @ApiOperation({ summary: "Elimina un permiso por ID" })
    @Delete(":id")
    async remove(@Param("id") id: string): Promise<any> {
        await this.permissionsService.remove(+id);
        return this.responseService.createResponse({
            message: "Permiso eliminado exitosamente",
        });
    }
}
