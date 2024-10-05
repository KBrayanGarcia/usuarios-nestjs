import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRoleEntity } from "../entity/user_roles.entity";
import { CreateUserRoleDto } from "../dto/create-user-role.dto";
import { UpdateUserRoleDto } from "../dto/update-user-role.dto";

@Injectable()
export class UserRolesService {
    constructor(
        @InjectRepository(UserRoleEntity)
        private readonly userRoleRepository: Repository<UserRoleEntity>
    ) {}

    async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRoleEntity> {
        const userRole = this.userRoleRepository.create(createUserRoleDto);
        return this.userRoleRepository.save(userRole);
    }

    async findAll(): Promise<UserRoleEntity[]> {
        return this.userRoleRepository.find({
            relations: {
                user: true,
                role: true,
            },
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
                user: {
                    id: true,
                    nombre: true,
                    apellido_paterno: true,
                    apellido_materno: true,
                    nombre_completo: true,
                    correo_electronico: true,
                    usuario: true,
                    estado: true,
                }
            },
            
        });
    }

    async findOne(id: number): Promise<UserRoleEntity> {
        return this.userRoleRepository.findOne({
            where: { id },
            relations: {
                user: true,
                role: true,
            },
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
                user: {
                    id: true,
                    nombre: true,
                    apellido_paterno: true,
                    apellido_materno: true,
                    nombre_completo: true,
                    correo_electronico: true,
                    usuario: true,
                    estado: true,
                }
            },
        });
    }

    async update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRoleEntity> {
        await this.userRoleRepository.update(id, updateUserRoleDto);
        return this.userRoleRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRoleRepository.delete(id);
    }
}
