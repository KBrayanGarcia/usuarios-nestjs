import { Injectable, OnModuleInit } from "@nestjs/common";
import { EnvService } from "src/modules/env/service/env.service";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

@Injectable()
export class DatabaseService implements OnModuleInit {
    public db: ReturnType<typeof drizzle>;

    constructor(private readonly envService: EnvService) {}

    async onModuleInit() {
        const pool = createPool({
            host: this.envService.get("DB_HOST"),
            user: this.envService.get("DB_USER"),
            password: this.envService.get("DB_PASSWORD"),
            database: this.envService.get("DB_NAME"),
        });

        this.db = drizzle(pool);
    }
}
