import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";
import { RoleEntity } from "./role.entity";
import { PermissionEntity } from "./permissions.entity";
import { UserEntity } from "./user.entity";

@Entity("role_permissions")
export class RolePermissionEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: true, nullable: false, type: "tinyint" })
    estado: boolean;

    @ManyToOne(() => RoleEntity, { nullable: false })
    @JoinColumn({ name: "role_id" })
    role: RoleEntity;

    @ManyToOne(() => PermissionEntity, { nullable: false })
    @JoinColumn({ name: "permission_id" })
    permission: PermissionEntity;

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

export type RolePermissionCreateInput = Omit<
    RolePermissionEntity,
    "id" | "fecha_creacion" | "fecha_actualizacion" | "creado_por" | "actualizado_por"
>;

export type RolePermissionUpdateInput = Partial<RolePermissionCreateInput>;

export type RolePermissionSelect = RolePermissionEntity;
