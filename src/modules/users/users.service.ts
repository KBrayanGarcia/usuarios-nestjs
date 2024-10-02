import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomErrorClass } from "../error/classes/custom_error.class";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findOne(id);

        if (!user) {
            throw new CustomErrorClass({
                message: "Usuario no encontrado",
                statusCode: 404,
            });
        }

        updateUserDto.nombre_completo = `${updateUserDto.nombre} ${updateUserDto.apellido_paterno} ${updateUserDto.apellido_materno}`;
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async getUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
