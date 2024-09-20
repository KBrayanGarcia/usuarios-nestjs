import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/modules/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, users_model } from "./entity/user.entity";
import { eq } from "drizzle-orm";

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createUserDto: CreateUserDto) {
        return await this.databaseService.db.insert(users_model).values(createUserDto).$returningId();
    }

    async findAll(): Promise<User[]> {
        return this.databaseService.db.select().from(users_model);
    }

    async findOne(id: number): Promise<User[]> {
        return await this.databaseService.db.select().from(users_model).where(eq(users_model.id, id)).limit(1);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async getUsers() {
        const users = await this.databaseService.db.select().from(users_model).execute();
        return users;
    }
}
