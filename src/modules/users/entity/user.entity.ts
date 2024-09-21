import { sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users_model = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement().notNull(),
    nombre: varchar("nombre", { length: 255 }).notNull(),
    apellido_paterno: varchar("apellido_paterno", { length: 255 }).notNull(),
    apellido_materno: varchar("apellido_materno", { length: 255 }),
    nombre_completo: varchar("nombre_completo", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique(),
    usuario: varchar("usuario", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    fecha_creacion: timestamp("fecha_creacion").default(sql`CURRENT_TIMESTAMP`),
    fecha_actualizacion: timestamp("fecha_actualizacion").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export type User = typeof users_model.$inferSelect;

export type UserInsert = typeof users_model.$inferInsert;
