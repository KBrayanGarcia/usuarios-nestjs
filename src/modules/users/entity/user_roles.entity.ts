import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { UserEntity } from "./user.entity";

@Entity("user_roles")
export class UserRoleEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: true, nullable: false, type: "tinyint" })
    estado: boolean;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, { nullable: false })
    @JoinColumn({ name: "role_id" })
    role: RoleEntity;

    @CreateDateColumn()
    fecha_creacion: Date;

    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: "creado_por" })
    creado_por: UserEntity;
    
    @UpdateDateColumn()
    fecha_actualizacion: Date;

    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: "actualizado_por" })
    actualizado_por: UserEntity;

}

export type UserRoleCreateInput = Omit<
    UserRoleEntity,
    "id" | "fecha_creacion" | "fecha_actualizacion" | "creado_por" | "actualizado_por"
>;

export type UserRoleUpdateInput = Partial<UserRoleCreateInput>;

export type UserRoleSelect = UserRoleEntity;

