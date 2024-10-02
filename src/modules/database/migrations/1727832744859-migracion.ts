import { MigrationInterface, QueryRunner } from "typeorm";

export class Migracion1727832744859 implements MigrationInterface {
    name = 'Migracion1727832744859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(150) NOT NULL, \`apellido_paterno\` varchar(150) NOT NULL, \`apellido_materno\` varchar(150) NULL, \`nombre_completo\` varchar(450) NOT NULL, \`correo_electronico\` varchar(255) NULL, \`usuario\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`estado\` tinyint NOT NULL DEFAULT 1, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_actualizacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creado_por\` int NULL, \`actualizado_por\` int NULL, UNIQUE INDEX \`IDX_512c9e21f9c89f71b2a047d6a4\` (\`correo_electronico\`), UNIQUE INDEX \`IDX_f06f84f3f2bc0696d00882fcfa\` (\`usuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_1db2cd4fdfbafa9dd853e57645a\` FOREIGN KEY (\`creado_por\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b05023cd358b3242d92c590b194\` FOREIGN KEY (\`actualizado_por\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b05023cd358b3242d92c590b194\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_1db2cd4fdfbafa9dd853e57645a\``);
        await queryRunner.query(`DROP INDEX \`IDX_f06f84f3f2bc0696d00882fcfa\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_512c9e21f9c89f71b2a047d6a4\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
