import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/modules/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createUserDto: CreateUserDto) {
        return "This action adds a new user";
    }

    findAll() {
        return "This action returns all users";
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    getUsers() {
        return "This action returns all users";
    }
}
