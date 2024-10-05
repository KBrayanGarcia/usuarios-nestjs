import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "../entity/role.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const role = this.roleRepository.create(createRoleDto);
        return this.roleRepository.save(role);
    }

    async findAll(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async findOne(id: number): Promise<RoleEntity> {
        return this.roleRepository.findOne({ where: { id } });
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
        await this.roleRepository.update(id, updateRoleDto);
        return this.roleRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }
}
