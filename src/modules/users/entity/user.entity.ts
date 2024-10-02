import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

export const length_nombre = 150;
export const length_apellido_paterno = 150;
export const length_apellido_materno = 150;
export const length_nombre_completo = length_nombre + length_apellido_paterno + length_apellido_materno;

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: length_nombre, nullable: false })
    nombre: string;

    @Column({ length: length_apellido_paterno, nullable: false })
    apellido_paterno: string;

    @Column({ length: length_apellido_materno, nullable: true })
    apellido_materno?: string;

    @Column({ length: length_nombre_completo, nullable: false })
    nombre_completo: string;

    @Column({ length: 255, unique: true, nullable: true })
    correo_electronico?: string;

    @Column({ length: 100, unique: true, nullable: false })
    usuario: string;

    @Column({ length: 255, nullable: false })
    password: string;

    @Column({ default: true, nullable: false, type: "tinyint" })
    estado: boolean;

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

export type UserCreateInput = Omit<
    UserEntity,
    "id" | "fecha_creacion" | "fecha_actualizacion" | "creado_por" | "actualizado_por"
>;

export type UserUpdateInput = Partial<UserCreateInput>;

export type UserSelect = UserEntity;
