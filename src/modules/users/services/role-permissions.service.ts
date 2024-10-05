import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RolePermissionEntity } from "../entity/role_permissions.entity";
import { CreateRolePermissionDto } from "../dto/create-role-permission.dto";
import { UpdateRolePermissionDto } from "../dto/update-role-permission.dto";

@Injectable()
export class RolePermissionsService {
    constructor(
        @InjectRepository(RolePermissionEntity)
        private readonly rolePermissionRepository: Repository<RolePermissionEntity>
    ) {}

    async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermissionEntity> {
        const rolePermission = this.rolePermissionRepository.create(createRolePermissionDto);
        return this.rolePermissionRepository.save(rolePermission);
    }

    async findAll(): Promise<RolePermissionEntity[]> {
        return this.rolePermissionRepository.find({
            relations: { role: true, permission: true },
            select: {
                id: true,
                estado: true,
                fecha_creacion: true,
                fecha_actualizacion: true,
                role: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                },
                permission: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                },
            },
        });
    }

    async findOne(id: number): Promise<RolePermissionEntity> {
        return this.rolePermissionRepository.findOne({
            where: { id },
            relations: { role: true, permission: true },
            select: {
                id: true,
                estado: true,
                fecha_creacion: true,
                fecha_actualizacion: true,
                role: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                },
                permission: {
                    id: true,
                    nombre: true,
                    descripcion: true,
                }
            },
        });
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermissionEntity> {
        await this.rolePermissionRepository.update(id, updateRolePermissionDto);
        return this.rolePermissionRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.rolePermissionRepository.delete(id);
    }
}
