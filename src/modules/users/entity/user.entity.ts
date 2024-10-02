import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 150, nullable: false })
    nombre: string;

    @Column({ length: 150, nullable: false })
    apellido_paterno: string;

    @Column({ length: 150, nullable: true })
    apellido_materno?: string;

    @Column({ length: 150, nullable: false })
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
