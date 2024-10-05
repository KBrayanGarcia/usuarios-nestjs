import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { UserEntity } from "../../users/entity/user.entity";

@Entity("permissions")
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100, unique: true, nullable: false })
    nombre: string;

    @Column({ length: 255, nullable: true })
    descripcion?: string;

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

export type PermissionCreateInput = Omit<
    PermissionEntity,
    "id" | "fecha_creacion" | "fecha_actualizacion" | "creado_por" | "actualizado_por"
>;

export type PermissionUpdateInput = Partial<PermissionCreateInput>;

export type PermissionSelect = PermissionEntity;
