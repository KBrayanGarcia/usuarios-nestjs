import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PermissionEntity } from "../entity/permissions.entity";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatePermissionDto } from "../dto/update-permission.dto";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(PermissionEntity)
        private readonly permissionRepository: Repository<PermissionEntity>
    ) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        const permission = this.permissionRepository.create(createPermissionDto);
        return this.permissionRepository.save(permission);
    }

    async findAll(): Promise<PermissionEntity[]> {
        return this.permissionRepository.find();
    }

    async findOne(id: number): Promise<PermissionEntity> {
        return this.permissionRepository.findOne({ where: { id } });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<PermissionEntity> {
        await this.permissionRepository.update(id, updatePermissionDto);
        return this.permissionRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.permissionRepository.delete(id);
    }
}
