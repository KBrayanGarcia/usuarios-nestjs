import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    schema: ["./src/modules/users/entity/user.entity.ts"],
    out: "./drizzle",
    dialect: "mysql",
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "usuarios-nestjs",
    },
});
